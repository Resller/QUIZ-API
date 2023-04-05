//date
    let question = 0 
    let rightQuestions = 0
    let time = 15
    let questionCounter = 1
    let answerSelected =''
    let intervalTime = ''

// events

document.querySelector('.button button').addEventListener('click',startGame)
document.querySelector('.button-question button').addEventListener('click',nextQuestion)
document.querySelector('.button-info button').addEventListener('click',restGame)

// functions

function startGame(){
    changePage();
    upDateBar();
    //timeQuestion();
    upDateQuestion();
}

function changePage(){
   let area1 = document.querySelector('.area-start')
   let area2 = document.querySelector('.area-quiz')

    area1.style.opacity ='0'
    area2.style.display = 'flex'
    setTimeout(()=>{
    area1.style.display = 'none'  
    area2.style.opacity ='1'
   },500)
}

function upDateBar (){
    let  questionNow = (questionCounter/  questions.length) * 100 
    document.querySelector('.bar').style.width =`${questionNow}%`
    document.querySelector(' .area-question-txt .txt').innerHTML =`Pergunta <span>${questionCounter}</span> de <span>${questions.length}</span> ` 
}

function timeQuestion(){
    let circleTime = document.querySelector('#time');
    document.querySelector('.time').style.color= '#FFF'
    
    intervalTime = setInterval(()=>{
        if(time <= 0){
            nextQuestion();
            return
        }
        if(time <=5){
            document.querySelector('.time').style.color= '#F00'
        }
        circleTime.style.transition = 'all ease-in-out 15.5s' ;
        document.querySelector('.time').innerHTML = time;
        circleTime.style.strokeDashoffset = 189;
        time--;
       
    },1000)
}

function circleTimeZero(){
    let circle = document.querySelector('#time');
    circle.style.transition = 'none';
    circle.style.strokeDashoffset = 0; 
}

function nextQuestion(){
    let areaQuestion = document.querySelector('.area-question')
    
    if(answerSelected === questions[question].answer){
    rightQuestions++;
    } 
   
    if(questionCounter == questions.length  ){
        clearInterval(intervalTime)
        upDateInfo();
        nextpage (document.querySelector('.info'),document.querySelector('.area-question'))
        return
    }
 
    

    areaQuestion.style.opacity = '0'
    setTimeout(()=>{
        areaQuestion.style.opacity = '1'

        clearInterval(intervalTime)
        circleTimeZero()
        
        document.querySelector('.time').innerHTML = 15;
        time = 15
        question++;
        questionCounter ++;
        
        upDateBar();
        upDateQuestion();
        timeQuestion()
    },500)
}

function upDateQuestion(){
    document.querySelector('.question').innerHTML = questions[question].question
    let areaAnswer = document.querySelector('.area-answer')
    areaAnswer.innerHTML =''
    let html = ''

    for(let i in questions[question].options){
       html += `<div  data-selected="${parseInt(i)}" class="answer"><span>${parseInt(i)+1}</span>${questions[question].options[i]}</div>`
    }
    areaAnswer.innerHTML = html
    
    selectionQuestion();
}

function selectionQuestion(){
    document.querySelectorAll('.answer').forEach((item)=>{
        item.addEventListener('click',(e)=>{
         let answerAll =  document.querySelectorAll('.answer')
          for(let i in answerAll){  
            if(answerAll[i].classList == 'answer active'){
                answerAll[i].classList.remove('active')
            }
          }
            e.target.classList.add('active');
            answerSelected = e.target.getAttribute('data-selected')
        })
    })
}

function upDateInfo(){
    let msg1 = '';
    let img = ''
    let color = ''

    let score = Math.floor((rightQuestions / questions.length) * 100 )
  
    if(score < 40){
       img = 'negativo'
       msg1 = `Mandou Mal` 
       color = '#f00' 
    }else if(score >= 40 && score < 60 ){
        img = 'ok'
        msg1 = `Mandou Bem` 
        color = '#FF8C00' 
    }else if( score > 60){
        img = 'prize'
        msg1 = `Parabéns` 
        color = '#005221' 
    }

    document.querySelector('.img-info img').src = `assets/img/${img}.png`
    document.querySelector('.msg-1').innerHTML = msg1
    document.querySelector('.hit').innerHTML = `Você acertou ${score}%`
    document.querySelector('.hit').style.color = color
    document.querySelector('.msg-2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${rightQuestions}`
    
}

function restGame(){
    question = 0 
    rightQuestions = 0
    time = 15
    questionCounter = 1
    answerSelected =''
    intervalTime = ''
    document.querySelector('.time').innerHTML = time;
    
    circleTimeZero()
    nextpage (document.querySelector('.area-question'),document.querySelector('.info')) 
    changePage();
    upDateBar();
    timeQuestion();
    upDateQuestion();
}

function nextpage (open,close){
    close.style.opacity = 0
    open.style.opacity = 0
    
    setTimeout(()=>{
        close.style.display = 'none'
        open.style.display = 'flex'
        open.style.opacity = 1
    },500)
}