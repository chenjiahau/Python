import os
from dotenv import load_dotenv
from openai import OpenAI
from langchain_tavily import TavilySearch
from langchain.agents import create_agent
from langchain_core.globals import set_debug
import argparse
from langchain.chat_models import init_chat_model

# ANSI 顏色控制碼
COLOR_SYSTEM = "\033[94m"   # 藍色 (系統訊息)
COLOR_AI = "\033[92m"       # 綠色 (AI 回覆)
COLOR_BOLD = "\033[1m"      # 粗體
COLOR_RESET = "\033[0m"     # 重設顏色

load_dotenv()

def main():
    # 解析命令列參數
    parser = argparse.ArgumentParser(description="LangChain Tavily Agent")
    parser.add_argument(
        "-d", "--debug",
        action="store_true",
        help="啟用 LangChain 全域偵錯日誌模式"
    )
    args = parser.parse_args()

    if args.debug:
        set_debug(True)
        print(f"{COLOR_SYSTEM}已啟用全域偵錯日誌模式。{COLOR_RESET}")

    # 1. 動態從您的 AI 伺服器獲取第一個可用模型
    api_key = os.getenv("OPENAI_API_KEY")
    base_url = os.getenv("OPENAI_BASE_URL", "https://aimodel.ivanhomes.cc/v1")

    print(f"{COLOR_SYSTEM}正在連線至 API 網址並獲取模型清單: {base_url}{COLOR_RESET}")
    chat_models = []
    try:
        client = OpenAI(api_key=api_key, base_url=base_url)
        models = client.models.list()
        model_list = [model.id for model in models.data]

        # 過濾掉 embedding 模型，優先尋找對話模型
        chat_models = [m for m in model_list if "embed" not in m.lower()]
        if chat_models:
            print(f"\n{COLOR_SYSTEM}可用的遠端模型清單：{COLOR_RESET}")
            for idx, model_name in enumerate(chat_models):
                print(f"  {idx + 1}. {model_name}")

            try:
                choice = input(f"\n{COLOR_BOLD}請選擇模型編號 (預設使用 [1] {chat_models[0]}):{COLOR_RESET} ").strip()
                if choice == "":
                    target_model = chat_models[0]
                else:
                    selected_idx = int(choice) - 1
                    if 0 <= selected_idx < len(chat_models):
                        target_model = chat_models[selected_idx]
                    else:
                        print(f"{COLOR_SYSTEM}編號超出範圍，將使用預設模型。{COLOR_RESET}")
                        target_model = chat_models[0]
            except ValueError:
                print(f"{COLOR_SYSTEM}輸入無效，將使用預設模型。{COLOR_RESET}")
                target_model = chat_models[0]
        else:
            target_model = model_list[0] if model_list else "gemma4:12b"

        print(f"{COLOR_SYSTEM}已選擇模型: {COLOR_BOLD}{target_model}{COLOR_RESET}\n")

    except Exception as e:
        print(f"{COLOR_SYSTEM}無法取得模型清單，將使用預設的 gemma4:12b。錯誤: {e}{COLOR_RESET}")
        target_model = "gemma4:12b"
        chat_models = [target_model]

    # 2. 初始化可動態配置的 LLM 模型
    llm = init_chat_model(
        target_model,
        model_provider="openai",
        configurable_fields=("model",),
        temperature=0.7,
        base_url=base_url
    )

    # 2.5. 初始化 Tavily 搜尋工具與 Agent
    search_tool = TavilySearch(max_results=3)
    tools = [search_tool]

    agent = create_agent(
        model=llm,
        tools=tools,
        system_prompt="你是一個有用的 AI 助手。你可以使用工具來搜尋網頁以解答使用者的問題。"
    )

    # 3. 進入互動式問答迴圈
    current_model = target_model
    print(f"\n{COLOR_SYSTEM}=========================================={COLOR_RESET}")
    print(f"{COLOR_SYSTEM}對話已開始！輸入 '{COLOR_BOLD}/model{COLOR_RESET}{COLOR_SYSTEM}' 可切換模型。{COLOR_RESET}")
    print(f"{COLOR_SYSTEM}輸入 '{COLOR_BOLD}exit{COLOR_RESET}{COLOR_SYSTEM}' 或 '{COLOR_BOLD}quit{COLOR_RESET}{COLOR_SYSTEM}' 可以退出程式。{COLOR_RESET}")
    print(f"{COLOR_SYSTEM}=========================================={COLOR_RESET}")

    while True:
        try:
            user_question = input(f"\n{COLOR_BOLD}[當前模型: {current_model}] 請輸入您的問題:{COLOR_RESET} ")
            if user_question.strip().lower() in ["exit", "quit"]:
                print(f"{COLOR_SYSTEM}對話結束，再見！{COLOR_RESET}")
                break

            if not user_question.strip():
                continue

            # 切換模型指令
            if user_question.strip().lower() == "/model":
                if chat_models:
                    print(f"\n{COLOR_SYSTEM}可用的遠端模型清單：{COLOR_RESET}")
                    for idx, model_name in enumerate(chat_models):
                        print(f"  {idx + 1}. {model_name}")

                    try:
                        choice = input(f"\n{COLOR_BOLD}請輸入新模型編號 (目前為 {current_model}):{COLOR_RESET} ").strip()
                        if choice != "":
                            selected_idx = int(choice) - 1
                            if 0 <= selected_idx < len(chat_models):
                                current_model = chat_models[selected_idx]
                                print(f"{COLOR_SYSTEM}已切換模型至: {COLOR_BOLD}{current_model}{COLOR_RESET}")
                            else:
                                print(f"{COLOR_SYSTEM}編號超出範圍，模型未變更。{COLOR_RESET}")
                    except ValueError:
                        print(f"{COLOR_SYSTEM}輸入無效，模型未變更。{COLOR_RESET}")
                else:
                    print(f"{COLOR_SYSTEM}無可用模型清單供切換。{COLOR_RESET}")
                continue

            print(f"{COLOR_SYSTEM}AI 正在思考中 (若有需要會自動進行 Tavily 網頁搜尋)...{COLOR_RESET}")
            response = agent.invoke(
                {"messages": [("user", user_question)]},
                config={"configurable": {"model": current_model}}
            )

            print(f"\n{COLOR_AI}{COLOR_BOLD}AI 回覆：{COLOR_RESET}")
            print(f"{COLOR_AI}{response['messages'][-1].content}{COLOR_RESET}")

        except KeyboardInterrupt:
            print(f"\n{COLOR_SYSTEM}偵測到中斷，對話結束。{COLOR_RESET}")
            break
        except Exception as e:
            print(f"\n發生錯誤: {e}")

if __name__ == "__main__":
    main()