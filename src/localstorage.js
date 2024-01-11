
const commentForm = document.getElementById('reviewInput');
const usernameElement = document.getElementById('username');

console.log(commentForm);
console.log(usernameElement);

function submitReview() {
    const reviewContent = commentForm.value.trim();
    const username = usernameElement.value.trim();

    if (reviewContent !== "" && username !== "") {
        const reviewData = {
            name: username,
            content: reviewContent,
        };

        saveReview(reviewData);
        loadReviews(); // 리뷰 목록 갱신
    }
}

function saveReview(reviewData) {
    // 로컬 스토리지에서 기존 리뷰를 가져옵니다.
    const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];

    // 새 리뷰를 배열에 추가합니다.
    existingReviews.push(reviewData);

    // 업데이트된 배열을 다시 로컬 스토리지에 저장합니다.
    localStorage.setItem('reviews', JSON.stringify(existingReviews));
}

function loadReviews() {
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = ''; // 기존 댓글 목록 비우기

    const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];

    if (existingReviews.length > 0) {
        existingReviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'reviewItem';
            reviewItem.innerHTML = `
            <p>${review.name}: ${review.content}</p> 
            <button id = "reviewDelete">삭제 </button>
            <button id = "reviewUpdate">수정 </button>`;
            commentList.appendChild(reviewItem);
        });
    } else {
        commentList.innerHTML = '<p>아직 리뷰가 없습니다.</p>';
    }
}


const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    submitReview();
});

loadReviews(); // 페이지 로드 시 리뷰 목록 불러오기

















// localStorage.setItem("test", "테스트입니다");

// const test = localStorage.getItem("test");
// console.log(test);


