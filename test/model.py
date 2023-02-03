import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForSequenceClassification
import numpy as np
import nltk
import matplotlib.pyplot as plt

def summary_model(text): # 요약 모델
    nltk.download('punkt')

    model = AutoModelForSeq2SeqLM.from_pretrained('eenzeenee/t5-base-korean-summarization')
    tokenizer = AutoTokenizer.from_pretrained('eenzeenee/t5-base-korean-summarization')
    prefix = "summarize: "

    inputs = [prefix + text]
    inputs = tokenizer(inputs, max_length=512, truncation=True, return_tensors="pt")
    output = model.generate(**inputs, num_beams=3, do_sample=True, min_length=10, max_length=100)
    decoded_output = tokenizer.batch_decode(output, skip_special_tokens=True)[0]
    return nltk.sent_tokenize(decoded_output.strip())[0]

def emo_model(temp): # 감정 추출 모델
    tokenizer_emo = AutoTokenizer.from_pretrained(
    'nlp04/korean_sentiment_analysis_dataset3',   # or float32 version: revision=KoGPT6B-ryan1.5b
    bos_token='[BOS]', eos_token='[EOS]', unk_token='[UNK]', pad_token='[PAD]', mask_token='[MASK]'
    )
    model_emo = AutoModelForSequenceClassification.from_pretrained(
    'nlp04/korean_sentiment_analysis_dataset3',  # or float32 version: revision=KoGPT6B-ryan1.5b
    )
    _ = model_emo.eval()

    with torch.no_grad():
        tokens = tokenizer_emo.encode(temp, return_tensors='pt')
        output = model_emo(tokens)
    
    #전처리
    return output.logits.tolist()[0]

def model_visualization(iplist):
    emotion = ['neutrality', 'happiness', 'Embarrassment','anger','unrest','sadness','aversion']
    plt.figure(figsize=(11,8))
    plt.bar(emotion, iplist, width=0.3)
    plt.savefig('./static/image/analyzeresult.png')