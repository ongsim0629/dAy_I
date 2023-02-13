import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForSequenceClassification
import numpy as np
import nltk
import matplotlib.pyplot as plt

from krwordrank.word import KRWordRank

#감정 추출 모델
tokenizer_emo = AutoTokenizer.from_pretrained('./model/emmo')
model_emo = AutoModelForSequenceClassification.from_pretrained('./model/emmo')

#요약 모델
sum_model = AutoModelForSeq2SeqLM.from_pretrained('./model/summ')
sum_tokenizer = AutoTokenizer.from_pretrained('./model/summ')

#키워드 추출 모델
min_count = 2   # 단어의 최소 출현 빈도수 (그래프 생성 시)
max_length = 10 # 단어의 최대 길이
wordrank_extractor = KRWordRank(min_count=2, max_length=6)

def summary_model(text): # 요약 모델
    nltk.download('punkt')
    prefix = "summarize: "

    inputs = [prefix + text]
    inputs = sum_tokenizer(inputs, max_length=512, truncation=True, return_tensors="pt")
    output = sum_model.generate(**inputs, num_beams=3, do_sample=True, min_length=30, max_length=100)
    decoded_output = sum_tokenizer.batch_decode(output, skip_special_tokens=True)[0]
    return nltk.sent_tokenize(decoded_output.strip())[0]


def emo_model(temp): # 감정 추출 모델
    _ = model_emo.eval()

    with torch.no_grad():
        tokens = tokenizer_emo.encode(temp, return_tensors='pt')
        output = model_emo(tokens)
    
    #전처리
    return output.logits.tolist()[0]

def keyword_model(text): #키워드 추출 모델

    beta = 0.85    # PageRank의 decaying factor beta
    max_iter = 10
    texts = []
    texts.append(text)
    keywords, rank, graph = wordrank_extractor.extract(texts, beta, max_iter)
    
    key_list = []
    for word, r in sorted(keywords.items(), key=lambda x:x[1], reverse=True)[:30]:
            key_list.append(word)
    
    key_list = key_list[:10]
    return key_list