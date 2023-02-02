from flask import Flask, render_template, request
from flask_ngrok import run_with_ngrok
from model import summary_model, emo_model, model_visualization

app = Flask(__name__)
run_with_ngrok(app)

@app.route("/anl", methods=['POST'])
def analyze_sentence():
    if request.method == 'POST':

        text = request.form.get("diary") # 입력받기
        temp = summary_model(text)
        emo_list = emo_model(temp)

    else:
        temp = "분석 실패"
    return render_template('diary.html', summary = temp, emolist = emo_list)
    
@app.route("/write")
def write_diary():
    return render_template('write.html')

@app.route("/")
def home():
    return render_template('home.html')

if __name__ == "__main__":
    app.run()