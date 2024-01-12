// import {generateMovieCards} from"./popular";
// generateMovieCards()
const commentForm = document.getElementById('reviewInput');
const usernameElement = document.getElementById('username');
const commentList = document.getElementById('commentList');
const userPassword = document.getElementById('password');

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
console.log(movieId);

function submitReview() {
    console.log('hi');
    const reviewContent = commentForm.value.trim();
    const username = usernameElement.value.trim();

    if (reviewContent !== "" && username !== "") {
        
        const reviewData = {
            id : new Date().getTime(),
            name: username,
            content: reviewContent,
            movieId: movieId
        };
        console.log(reviewData);

        saveReview(reviewData);
        loadReviews(); // 리뷰 목록 갱신
    }
}

function loadReviews() {
    commentList.innerHTML = ''; // 기존 댓글 목록 비우기

    const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];

    if (existingReviews.length > 0) {
        existingReviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'reviewItem';
            reviewItem.innerHTML = `
            <p>${review.name}: ${review.content}, ${review.id}</p> 
            <button class = "deleteButton" data-review-id="${review.id}">삭제 </button>
            <button class = "reviewUpdate">수정 </button>`;
            commentList.appendChild(reviewItem);
        });
        //삭제버튼 이벤트 리스너 추가 삭제버튼에 data- 값을 주고 this.dataset.reviewid 삭제버튼을 누르면
        //삭제버튼의 데이터 값 ${review.id}를 가져옴 
        const deleteButtons = document.querySelectorAll('.deleteButton');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const reviewId = parseInt(this.dataset.reviewId);
                deleteReview(reviewId);
                loadReviews(); // 리뷰 목록 갱신
            });
        });
    } else {
        commentList.innerHTML = '<p>아직 리뷰가 없습니다.</p>';
    }
};


function deleteReview(reviewId) {
    const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const updatedReviews = existingReviews.filter(review => review.id !== reviewId);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
};
//filter를 통해 reviewid와 다른 값만 남기고 저장

function saveReview(reviewData) {
    const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    existingReviews.push(reviewData);
    localStorage.setItem('reviews', JSON.stringify(existingReviews));
}

const form = document.querySelector('#inputForm');
console.log(form);
form.addEventListener('submit', function(event) {
    event.preventDefault();
    submitReview();
});

loadReviews(); // 페이지 로드 시 리뷰 목록 불러오기