from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from openai import OpenAI
import os

load_dotenv()

def main():
    print("Hello from langchain-course!")
    
    # 來源資料：Elon Musk 的生平簡介
    information = """
    Elon Reeve Musk FRS (/ˈiːlɒn/ EE-lon; born June 28, 1971) is a businessman, known for his leadership of Tesla, SpaceX, X (formerly Twitter), and the Department of Government Efficiency (DOGE). Musk has been the wealthiest person in the world since 2021; as of May 2025, Forbes estimates his net worth to be US$424.7 billion. Born to a wealthy family in Pretoria, South Africa, Musk emigrated in 1989 to Canada. He received bachelor's degrees from the University of Pennsylvania in 1997 before moving to California, United States, to pursue business ventures. In 1995, Musk co-founded the software company Zip2. Following its sale in 1999, he co-founded X.com, an online payment company that later merged to form PayPal, which was acquired by eBay in 2002. That year, Musk also became an American citizen. In 2002, Musk founded the space technology company SpaceX, becoming its CEO and chief engineer; the company has since led innovations in reusable rockets and commercial spaceflight. Musk joined the automaker Tesla as an early investor in 2004 and became its CEO and product architect in 2008; it has since become a leader in electric vehicles. In 2015, he co-founded OpenAI to advance artificial intelligence (AI) research but later left; growing discontent with the organization's direction and their leadership in the AI boom in the 2020s led him to establish xAI. In 2022, he acquired the social network Twitter, implementing significant changes and rebranding it as X in 2023. His other businesses include the neurotechnology company Neuralink, which he co-founded in 2016, and the tunneling company the Boring Company, which he founded in 2017. Musk was the largest donor in the 2024 U.S. presidential election, and is a supporter of global far-right figures, causes, and political parties. In early 2025, he served as senior advisor to United States president Donald Trump and as the de facto head of DOGE. After a public feud with Trump, Musk left the Trump administration and announced he was creating his own political party, the America Party. Musk's political activities, views, and statements have made him a polarizing figure, especially following the COVID-19 pandemic. He has been criticized for making unscientific and misleading statements, including COVID-19 misinformation and promoting conspiracy theories, and affirming antisemitic, racist, and transphobic comments. His acquisition of Twitter was controversial due to a subsequent increase in hate speech and the spread of misinformation on the service. His role in the second Trump administration attracted public backlash, particularly in response to DOGE.
    """
    
    # 1. 定義提示詞範本
    summary_template = """
    given the information {information} about a person I want you to create:
    1. A short summary
    2. two interesting facts about them
    """
    
    summary_prompt_template = PromptTemplate(
        input_variables=["information"], 
        template=summary_template
    )
    
    # 2. 動態從您的 AI 伺服器獲取第一個可用模型
    api_key = os.getenv("OPENAI_API_KEY")
    base_url = os.getenv("OPENAI_BASE_URL", "https://aimodel.ivanhomes.cc/v1")
    
    print(f"正在連線至 API 網址並獲取模型清單: {base_url}")
    try:
        client = OpenAI(api_key=api_key, base_url=base_url)
        models = client.models.list()
        model_list = [model.id for model in models.data]
        
        # 過濾掉 embedding 模型，優先尋找對話模型
        chat_models = [m for m in model_list if "embed" not in m.lower()]
        target_model = chat_models[0] if chat_models else model_list[0]
        print(f"已自動選擇預設模型: {target_model}")
        
    except Exception as e:
        print(f"無法取得模型清單，將使用預設的 gemma4:12b。錯誤: {e}")
        target_model = "gemma4:12b"
        
    # 3. 初始化 LLM 模型
    llm = ChatOpenAI(
        temperature=0,
        model=target_model,
        base_url=base_url
    )
    
    # 4. 使用 LCEL 語法串聯組合 (Chain)
    chain = summary_prompt_template | llm
    
    # 5. 執行並傳入資料
    response = chain.invoke(input={"information": information})
    
    # 6. 印出 AI 回傳的文字內容
    print("\n模型回覆內容：")
    print(response.content)

if __name__ == "__main__":
    main()