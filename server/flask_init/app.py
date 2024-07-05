from flask import Flask, render_template, redirect, url_for, request, send_file, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, LoginManager, login_user, login_required, logout_user
# from flask_wtf import FlaskForm
# from wtforms import StringField, PasswordField, SubmitField
# from wtforms.validators import InputRequired, Length
import uuid
import qrcode
from io import BytesIO
from PIL import Image
import base64
import pandas
import openpyxl
from fileinput import filename
import datetime
import pytz
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SECRET_KEY'] = '9370a072-fb16-4ad1-93bb-85e5ca54a7ad'
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)

class Garden(db.Model):
    uid = db.Column(db.String(180), primary_key=True)
    qr_code = db.Column(db.LargeBinary)
    scientific_name = db.Column(db.String(180), nullable=False)
    common_name = db.Column(db.String(180), nullable=False)
    flowering_time = db.Column(db.String(180), nullable=False)
    identifying_characters = db.Column(db.String(1000), nullable=False)
    economic_importance = db.Column(db.String(1000), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.datetime.now(pytz.timezone('Asia/Kolkata')))


# # class LoginForm(FlaskForm):
# #     username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={'placeholder':'Username'})
# #     password = PasswordField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={'placeholder':'Password'})
# #     submit = SubmitField("Login")

# # class GardenForm(FlaskForm):
# #     scientific_name = StringField(validators=[InputRequired(), Length(min=4, max=80)], render_kw={'placeholder':'Scientific Name'})
# #     common_name = StringField(validators=[InputRequired(), Length(min=4, max=80)], render_kw={'placeholder':'Common Name'})
# #     flowering_time = StringField(validators=[InputRequired(), Length(min=4, max=80)], render_kw={'placeholder':'Flowering Time'})
# #     submit = SubmitField("Add Record")
# @app.route('/', methods=['GET','POST'])
# def blank_page():
#     # if(login_remembered()):
#     #     return redirect('/dashboard')
#     return redirect('/login')

@app.route('/', methods=['GET','POST'])
def show_login_page():
    if request.method=='POST':
        username = request.form['username']
        password = request.form['password']
        remember = request.form.get('remember')
        user = User.query.filter_by(username=username).first()
        if user:
            if user.password == password:
                login_user(user)
                return redirect(url_for('show_dashboard'))
            else:
                return render_template('login.html',incorrect=True)
        else:
            return render_template('login.html',incorrect=True)
    # form = LoginForm()
    # if form.validate_on_submit():
    #     user = User.query.filter_by(username=form.username.data).first()
    #     if user:
    #         if user.password == form.password.data:
    #             login_user(user)
    #             return redirect(url_for('show_dashboard'))
    return render_template('login.html',incorrect=False)

@app.route('/api/<string:uid>', methods=['GET','POST'])
def api(uid):
    if uid == "all":
        response = []
        records = Garden.query.all()
        for record in records:
            response.append({
                "uid": record.uid,
                "scientific_name": record.scientific_name,
                "common_name": record.common_name,
                "flowering_time": record.flowering_time,
                "identifying_characters": record.identifying_characters,
                "economic_importance": record.economic_importance
            })
        return jsonify(response)
    else:
        record = Garden.query.filter_by(uid=uid).first()
        response = {
            "uid": record.uid,
            "scientific_name": record.scientific_name,
            "common_name": record.common_name,
            "flowering_time": record.flowering_time,
            "identifying_characters": record.identifying_characters,
            "economic_importance": record.economic_importance
        }
        return jsonify(response)

@app.route('/dashboard', methods=['GET','POST'])
@login_required
def show_dashboard():
    return render_template('dashboard.html')

@app.route('/add', methods=['GET','POST'])
@login_required
def add_record():
    duplicate=False
    if request.method=='POST':
        scientific_name = request.form['scientific_name']
        common_name = request.form['common_name']
        flowering_time = request.form['flowering_time']
        identifying_characters = request.form['identifying_characters']
        economic_importance = request.form['economic_importance']
        record2 = Garden.query.filter_by(scientific_name=scientific_name).first()
        if (len(scientific_name)==0 or len(common_name)==0 or len(flowering_time)==0 or len(identifying_characters)==0 or len(economic_importance)==0):
            return render_template('add_record.html',blank=1,duplicate=False)
        if record2 is None:
            new_uid = str(uuid.uuid4())
            qr = qrcode.QRCode(version=1, box_size=10, border=5)
            qr.add_data(new_uid)
            qr.make(fit=True)
            img = qr.make_image(fill_color='black', back_color='white')
            buffer = BytesIO()
            img.save(buffer, format='PNG')
            image_data = buffer.getvalue()
            new_garden = Garden(uid=new_uid, qr_code=image_data, scientific_name=scientific_name, common_name=common_name,  flowering_time=flowering_time, identifying_characters=identifying_characters,    economic_importance=economic_importance)
            db.session.add(new_garden)
            db.session.commit()
            return redirect(url_for('show_preview', qid=new_uid))
        else:
            duplicate=True
    return render_template('add_record.html',blank=0,duplicate=duplicate)

@app.route('/view', methods=['GET','POST'])
@login_required
def view_records():
    allRecords = Garden.query.all()
    
    return render_template('view_records.html', allRecords=allRecords)

@app.route('/view/update/<string:uid>', methods=['GET', 'POST'])
def update(uid):
    if request.method=='POST':
        scientific_name = request.form['scientific_name']
        common_name = request.form['common_name']
        flowering_time = request.form['flowering_time']
        identifying_characters = request.form['identifying_characters']
        economic_importance = request.form['economic_importance']
        record = Garden.query.filter_by(uid=uid).first()
        record.scientific_name = scientific_name
        record.common_name = common_name
        record.flowering_time = flowering_time
        record.identifying_characters = identifying_characters
        record.economic_importance = economic_importance
        db.session.add(record)
        db.session.commit()
        return redirect("/view")
        
    record = Garden.query.filter_by(uid=uid).first()
    return render_template('update.html', record=record)

@app.route('/view/delete/<string:uid>')
def delete(uid):
    record = Garden.query.filter_by(uid=uid).first()
    db.session.delete(record)
    db.session.commit()
    return redirect("/view")

@app.route('/importer', methods=['GET','POST'])
@login_required
def show_importer():
    count=0
    file = request.files['file']
    if not file :
        return render_template('add_record.html', blank=2)
    file.save(file.filename)
    ImportedData = pandas.read_excel(file)
    for index, x in ImportedData.iterrows():
        record2 = Garden.query.filter_by(scientific_name=str(x["Scientific Name"])).first()
        if record2 is None:
            new_uid = str(uuid.uuid4())
            qr = qrcode.QRCode(version=1, box_size=10, border=5)
            qr.add_data(new_uid)
            qr.make(fit=True)
            img = qr.make_image(fill_color='black', back_color='white')
            buffer = BytesIO()
            img.save(buffer, format='PNG')
            image_data = buffer.getvalue()
            new_garden = Garden(uid=new_uid, qr_code=image_data, scientific_name=str(x["Scientific Name"]), common_name=str(x   ["Common Name"]), flowering_time=str(x["Flowering Time"]), identifying_characters=str(x["Identifying Characters"]),    economic_importance=str(x["Economic Importance "]))
            db.session.add(new_garden)
            db.session.commit()
        else:
            count=count+1


    return render_template('add_record.html',count=count)

@app.route('/preview/<qid>')
def show_preview(qid):
    record = Garden.query.filter_by(uid=qid).first()
    my_image = record.qr_code
    image = Image.open(BytesIO(my_image))
    buffer = BytesIO()
    image.save(buffer, format='PNG')
    data = base64.b64encode(buffer.getvalue()).decode()
    data_url = f'data:image/png;base64,{data}'
    return render_template('preview.html', data_url=data_url,uid=qid)

@app.route('/download/<qid>')
def download(qid):
    img = qrcode.make(qid)
    img.save('./static/qr codes/QRCode'+qid+'.png')
    p="static/qr codes/QRCode"+qid+'.png'
    return send_file(p, as_attachment=True)
    return redirect("/view")

@app.route('/logout')
def logout():
    logout_user()
    return redirect("/")

if __name__ == '__main__':
    app.run(debug=True)
