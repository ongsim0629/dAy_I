from flask import Flask, render_template, request, jsonify
# from model import summary_model, emo_model, model_visualization, keyword_model
import numpy as np
# import json

app = Flask(__name__)

# @app.route("/")
# def start():
#     return render_template('index.html')

# @app.route('/mltest', methods=['POST'])
# def test():
#     lists = request.args['file_name']
#     lists = lists.split(',')
#     data = []
#     for list in lists:
#         data.append(list)

#     return result

############################## Node.js 연동 test ####################################

# Node.js로부터 일기 받아와서 내용 바꾸고 넘기기
@app.route("/sendmodeltext", methods=['POST'])
def writetest():
    # print("모델 서버 현재 text: " + request.args['text'])
    params = request.args['text'] + "지금 이 내용이 보인다면 FLASK와 NODEJS 간의 API 서버 연결에 성공했다는 의미이다."
    # print("모델 서버 현재 text: " + params)
    return jsonify({
        'result': params
    })

############################## Node.js 연동 test ####################################

# @app.route("/learningresult", methods=['POST'])
# def analyze_sentence():
#     if request.method == 'POST':
#         text = request.form.get("diary") # 입력받기
#         oneLine_text = text_oneLine(text)
#         summ = summary_model(oneLine_text)
#         emo_list = emo_model(summ)
#         model_visualization(emo_list)
#         key_list = keyword_model(text)
#     else:
#         summ = "분석 실패"
#     return search_diary(summ , key_list)

@app.route("/write")
def write_diary():
    return render_template('write.html')

@app.route("/diary")
def search_diary(summ, key_list):
    return render_template('diary.html', summary = summ, kwd = key_list)

def text_oneLine(text):
    applied_text = text.replace("\n", "")
    applied_text = text.replace("\t", "")
    return applied_text

if __name__ == "__main__":
    app.run(port='4000')