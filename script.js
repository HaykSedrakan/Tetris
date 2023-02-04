window.addEventListener('DOMContentLoaded',() => {

    const grid = document.querySelector('.grid'),
          playBtn = document.querySelector('.play'),
          audio = document.querySelector('audio'),
          reloadBtn = document.querySelector('.reload'),
          instructionBtn = document.querySelector('.information')

    let squares = Array.from(document.querySelectorAll('.grid div'))
    let score = document.querySelector('#score')

    let count = 0

    function fullCode()
    {

        let lForm = [
            [1,11,21,2],
            [10,11,12,22],
            [1,11,21,20],
            [10,20,21,22],
        ]

        let zForm = [
            [11,12,20,21],
            [0,10,11,21],
            [11,12,20,21],
            [0,10,11,21],
        ]

        let tForm = [
            [1,10,11,12],
            [1,11,12,21],
            [10,11,12,21],
            [1,10,11,21],
        ]

        let oForm = [
            [0,1,10,11],
            [0,1,10,11],
            [0,1,10,11],
            [0,1,10,11],
        ]

        let iForm = [
            [1,11,21,31],
            [10,11,12,13],
            [1,11,21,31],
            [10,11,12,13],
        ]

        let randomForm = [lForm,iForm,oForm,tForm,zForm,lForm]

        let mainPosition = 4
        let mainRotation = 0

        let colors = ['#008080','#FF0000','#C71585','#0000CD','#9df9ef','#00FF00','rgb(127, 255, 212)','rgb(255, 20, 147)','rgb(173, 255, 47)','#FF0000']

        let randomColor = Math.floor(Math.random() * colors.length)
        let random = Math.floor(Math.random() * randomForm.length)

        let currentRandomForm = randomForm[random][mainRotation]

        function draw(){

            currentRandomForm.forEach((index)=>{
                squares[mainPosition + index].style.background = colors[random]
            })
        }
        draw()

        function erase(){
            currentRandomForm.forEach((index) => {
                squares[mainPosition + index].style.background = ''
            })
        }

        function moveDown(){
            erase()

            mainPosition += 10
            draw()
            stop()
        }

        moveDown()

        let timerMoveDownAutomaticly = setInterval(moveDown,1000)

        function stop(){
        if(currentRandomForm.some(item => squares[mainPosition + item + 10].classList.contains('freeze')))
        {
            currentRandomForm.forEach(item => squares[mainPosition + item].classList.add('freeze'))

            random = Math.floor(Math.random() * randomForm.length)

            mainRotation = 0

            currentRandomForm = randomForm[random][mainRotation]

            mainPosition = 4

            draw() 
            GAME_OVER()
            addScores()
        }
        }

        function moveLeft(){
            erase()
            
            let leftPlaceblocking = currentRandomForm.some(item => (mainPosition + item) % 10 === 0)

            let freezeBlockLeft = currentRandomForm.some(index => squares[mainPosition + index - 1].classList.contains('freeze'))

            if(!leftPlaceblocking && !freezeBlockLeft)
            {
                mainPosition--
            }

            draw()
        }

        function moveRight(){
            erase()
            
            let rightPlaceblocking = currentRandomForm.some(item => (mainPosition + item) % 10 === 9)

            let freezeBlockRight = currentRandomForm.some(index => squares[mainPosition + index +  1].classList.contains('freeze'))

            if(!rightPlaceblocking && !freezeBlockRight)
            {
                mainPosition++
            }

            draw()
        }

        function rotate(){
            erase()

            mainRotation++

            if(mainRotation === 4)
            {
                mainRotation = 0
            }

            currentRandomForm = randomForm[random][mainRotation]

            draw()
        }



        function control(event){
            switch(event.keyCode){
                case 37:
                    moveLeft()
                    break
                case 39:
                    moveRight()
                    break
            
                case 40:
                    moveDown()
                    break
                case 32:
                    rotate()
                    break

            default:
                return
            }
        }

        window.addEventListener('keydown', control)


        function GAME_OVER(){
            if(currentRandomForm.some(index => squares[mainPosition +  index].classList.contains('freeze')))
            {
            score.innerHTML = 'GAME OVER !'

            clearInterval(timerMoveDownAutomaticly)
            window.removeEventListener('keydown', control)

            audio.pause()
            }
        }

        function addScores(){
            for(let i = 0 ; i < 199;i += 10)
            {
                const row = [i , i + 1,i + 2,i + 3,i + 4,i + 5,i + 6,i + 7,i + 8,i + 9]
                console.log(row)

                if(row.every(item => squares[item].classList.contains('freeze')))
                {
                    count += 10
                    
                    score.textContent = `Score: ${count}`

                    row.forEach(item => {
                        squares[item].classList.remove('freeze')
                        squares[item].style.background = ''
                    })
                    const squareRemover = squares.splice(i,10)
                    squares = squareRemover.concat(squares)
                    squares.forEach(item => grid.append(item))
                } 
            }
        }

        addScores()

    }

    function globalFn()
    {
        playBtn.addEventListener('click',() => {
            fullCode()
            audio.play()
        },{once:true})
    }

    globalFn()

    const myModal = $.modal()
    
    setTimeout(myModal.open,500)

    const closeModal = document.querySelector('.modal-close')

    if(closeModal)
    {
        closeModal.addEventListener('click',myModal.close)
    }

    reloadBtn.addEventListener('click',(e) => {
        e.preventDefault()
        location.reload()
        globalFn()
    })

    instructionBtn.addEventListener('click',myModal.open)
})
