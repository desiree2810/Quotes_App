import React from 'react'

function QuotePopUp() {
    return (
        <div>
            {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalEdit">
                Edit
            </button> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <div className='quote-div'>
                            <p>Quote</p>
                            <input type="text" />
                        </div>
                        <div className='author-div'>
                            <p>Author</p>
                            <input type="text" />
                        </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuotePopUp
