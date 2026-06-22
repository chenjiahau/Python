from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from openai import OpenAI
import os

# ANSI 顏色控制碼
COLOR_SYSTEM = "\033[94m"   # 藍色 (系統訊息)
COLOR_AI = "\033[92m"       # 綠色 (AI 回覆)
COLOR_BOLD = "\033[1m"     # 粗體
COLOR_RESET = "\033[0m"     # 重設顏色

load_dotenv()

def main():
    # 1. 動態從您的 AI 伺服器獲取第一個可用模型
    api_key = os.getenv("OPENAI_API_KEY")
    base_url = os.getenv("OPENAI_BASE_URL", "https://aimodel.ivanhomes.cc/v1")
    
    print(f"{COLOR_SYSTEM}正在連線至 API 網址並獲取模型清單: {base_url}{COLOR_RESET}")
    try:
        client = OpenAI(api_key=api_key, base_url=base_url)
        models = client.models.list()
        model_list = [model.id for model in models.data]
        
        # 過濾掉 embedding 模型，優先尋找對話模型
        chat_models = [m for m in model_list if "embed" not in m.lower()]
        target_model = chat_models[0] if chat_models else model_list[0]
        print(f"{COLOR_SYSTEM}已自動選擇預設模型: {COLOR_BOLD}{target_model}{COLOR_RESET}")
        
    except Exception as e:
        print(f"{COLOR_SYSTEM}無法取得模型清單，將使用預設的 gemma4:12b。錯誤: {e}{COLOR_RESET}")
        target_model = "gemma4:12b"
        
    # 2. 初始化 LLM 模型
    llm = ChatOpenAI(
        temperature=0.7,
        model=target_model,
        base_url=base_url
    )
    
    # 3. 進入互動式問答迴圈
    print(f"\n{COLOR_SYSTEM}=========================================={COLOR_RESET}")
    print(f"{COLOR_SYSTEM}對話已開始！輸入 '{COLOR_BOLD}exit{COLOR_RESET}{COLOR_SYSTEM}' 或 '{COLOR_BOLD}quit{COLOR_RESET}{COLOR_SYSTEM}' 可以退出程式。{COLOR_RESET}")
    print(f"{COLOR_SYSTEM}=========================================={COLOR_RESET}")
    
    while True:
        try:
            user_question = input(f"\n{COLOR_BOLD}請輸入您的問題:{COLOR_RESET} ")
            if user_question.strip().lower() in ["exit", "quit"]:
                print(f"{COLOR_SYSTEM}對話結束，再見！{COLOR_RESET}")
                break
                
            if not user_question.strip():
                continue
                
            print(f"{COLOR_SYSTEM}AI 正在思考中...{COLOR_RESET}")
            response = llm.invoke(user_question)
            
            print(f"\n{COLOR_AI}{COLOR_BOLD}AI 回覆：{COLOR_RESET}")
            print(f"{COLOR_AI}{response.content}{COLOR_RESET}")
            
        except KeyboardInterrupt:
            print(f"\n{COLOR_SYSTEM}偵測到中斷，對話結束。{COLOR_RESET}")
            break
        except Exception as e:
            print(f"\n發生錯誤: {e}")

if __name__ == "__main__":
    main()