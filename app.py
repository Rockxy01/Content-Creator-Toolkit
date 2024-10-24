from flask import Flask, render_template, request
from utils import summarize_text, check_plagiarism, format_markdown, get_random_quote, count_words

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    summary = ""
    plagiarism_result = ""
    formatted_html = ""
    random_quote = ""
    word_count = {"words": 0, "characters": 0, "sentences": 0}
    
    if request.method == "POST":
        text_input = request.form.get("text")
        if request.form.get("summarize"):
            summary = summarize_text(text_input)
        elif request.form.get("plagiarism"):
            plagiarism_result = check_plagiarism(text_input)
        elif request.form.get("markdown"):
            formatted_html = format_markdown(text_input)
        elif request.form.get("quote"):
            random_quote = get_random_quote()
        elif request.form.get("word_count"):
            word_count = count_words(text_input)
    
    return render_template("index.html", summary=summary, plagiarism_result=plagiarism_result,
                           formatted_html=formatted_html, random_quote=random_quote, word_count=word_count)

if __name__ == "__main__":
    app.run(debug=True)
