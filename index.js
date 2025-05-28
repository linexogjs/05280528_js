const travelBucket = [];

function addBucket() {
  const place = document.querySelector("input[name=place]").value.trim();
  const reason = document.querySelector("input[name=reason]").value.trim();

// 예외처리
  if (!place || !reason) {
    alert("모든 칸을 입력해주세요.");
    return;
  }

  travelBucket.push({ place, reason });

  // 입력 초기화
  // 이거 해줘야 input 태그에 작성한 요소 사라짐!!
  document.querySelector("input[name=place]").value = "";
  document.querySelector("input[name=reason]").value = "";

  console.log(travelBucket);
}

function saveBucket() {
  if (travelBucket.length === 0) {
    alert("저장할 여행지가 없습니다.");
    return;
  }
  const jsonStr = JSON.stringify(travelBucket);
  localStorage.setItem("travelBucket", jsonStr);
  alert("저장 완료!");
}

function loadBucket() {
  const result = localStorage.getItem("travelBucket");
  const arr = JSON.parse(result || "[]");

  travelBucket.length = 0;
  travelBucket.push(...arr);

  const divTag = document.querySelector("#bucket-list");
  divTag.innerHTML = ""; // 초기화

  for (let obj of travelBucket) {
    const card = document.createElement("div");
    card.className = "card";

    const place = document.createElement("h3");
    place.innerText = obj.place;

    const reason = document.createElement("p");
    reason.innerText = obj.reason;

    // 클릭 시 이유 토글
    place.addEventListener("click", () => {
      reason.style.display = reason.style.display === "none" || reason.style.display === "" ? "block" : "none";
    });

    card.appendChild(place);
    card.appendChild(reason);
    divTag.appendChild(card);
  }
}
