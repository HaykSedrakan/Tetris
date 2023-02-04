function _createModal(options){
    const modal = document.createElement('div')
    modal.classList.add('hmodal')
    modal.insertAdjacentHTML('afterbegin',`
        <div class = 'modal-overlay'>
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">Tetris Instruction</span>
                    <span class = 'modal-close'>&times;</span>
                </div>
                <div class="modal-body">
                    <p>Welcome To My Tetris. Here you can find game instructions, buttons and much more.</p>
                    <p>If you want to shift to the right use <span class = 'figure'>&rarr;</span><br> If you want to shift left use <span class = 'figure'>&larr;</span> <br> If you want to scroll down use <span class = 'figure'>&darr;</span> <br> If you want to borrow, use the form <span class = 'figure' id = 'space'>&tbrk;</span> <br> <p class = 'game-over'>If form === top tetramino return 'GAME OVER !'</p> <br> <p class = 'info-score'>Every collected line turns into <span class = 'intro-score'>10 score </span></p></p>
                </div>
            </div>
        </div>
    `)

    document.body.appendChild(modal)

    return modal
}


$.modal = function(options){

    const ANIMARTION_SPEED = 500
    let closing = false

    const $modal = _createModal(options)

     return {
        open(){
           !closing && $modal.classList.add('open')
        },

        close(){
           $modal.classList.remove('open')
           $modal.classList.add('hide')
           closing = true

           setTimeout(() => {
            $modal.classList.remove('hide')
            closing = false
           },ANIMARTION_SPEED)
        },

        destroy(){}
     }
}


