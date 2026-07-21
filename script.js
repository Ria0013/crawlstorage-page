// =========================
// 기본 변수
// =========================

const loginScreen = document.getElementById("login-screen");
const loadingScreen = document.getElementById("loading-screen");
const mainScreen = document.getElementById("main-screen");

const anomalyScreen =
    document.getElementById("anomaly-screen");

const employeeNameInput =
    document.getElementById("employee-name");

const enterButton =
    document.getElementById("enter-button");

const logoutButton =
    document.getElementById("logout-button");

const userName =
    document.getElementById("user-name");

const loadingProgress =
    document.getElementById("loading-progress");


// =========================
// 화면 전환
// =========================

function showScreen(screen) {

    loginScreen.classList.remove("active");

    loadingScreen.classList.remove("active");

    mainScreen.classList.remove("active");

    anomalyScreen.classList.remove("active");


    screen.classList.add("active");

}



// =========================
// 입장 기능
// =========================

enterButton.addEventListener("click", function () {

    const employeeName =
        employeeNameInput.value.trim();


    // 아무 텍스트나 입력하면 입장 가능

    if (employeeName === "") {

        employeeNameInput.focus();

        return;

    }


    // 입력한 이름을 메인 화면에 표시

    userName.textContent =
        employeeName;


    // 입장 화면 → 로딩 화면

    showScreen(loadingScreen);


    // 로딩바 초기화

    loadingProgress.style.width =
        "0%";


    // 1.5초 동안 로딩바 진행

    setTimeout(function () {

        loadingProgress.style.width =
            "100%";

    }, 100);


    // 1.5초 후 메인 화면으로 이동

    setTimeout(function () {

        showScreen(mainScreen);

    }, 1500);

});


// =========================
// 엔터키로 입장
// =========================

employeeNameInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            enterButton.click();

        }

    }
);


// =========================
// 로그아웃
// =========================

logoutButton.addEventListener("click", function () {

    // 메인 화면 → 입장 화면

    showScreen(loginScreen);


    // 입력창 초기화

    employeeNameInput.value =
        "";


    // 이름 표시 초기화

    userName.textContent =
        "UNKNOWN";


    // 입력창에 자동 포커스

    employeeNameInput.focus();

});

// =========================
// CLW 시간
// =========================

const clwTime =
    document.getElementById("clw-time");


function updateCLWTime() {

    const now =
        new Date();


    const hours =
        String(now.getHours()).padStart(2, "0");


    const minutes =
        String(now.getMinutes()).padStart(2, "0");


    const seconds =
        String(now.getSeconds()).padStart(2, "0");


    clwTime.textContent =
        `CLW ${hours}:${minutes}:${seconds}`;

}


// 즉시 한 번 실행

updateCLWTime();


// 1초마다 갱신

setInterval(
    updateCLWTime,
    1000
);


// =========================
// 메시지 전송
// =========================

const messageRecipient =
    document.getElementById("message-recipient");


const messageInput =
    document.getElementById("message-input");


const sendMessageButton =
    document.getElementById("send-message-button");


const messageResult =
    document.getElementById("message-result");


sendMessageButton.addEventListener(
    "click",
    function () {

        const recipient =
            messageRecipient.value;


        // 메시지 내용은 실제 저장하지 않음

        if (
            messageInput.value.trim() === ""
        ) {

            messageInput.focus();

            return;

        }


        const currentTime =
            clwTime.textContent;


        messageResult.innerHTML =

            `메시지가 ${recipient}로 발송되었습니다.<br>
             ${currentTime}`;


        // 전송 후 입력창 초기화

        messageInput.value =
            "";

    }
);


// =========================
// 파일 선택
// =========================

const fileItems =
    document.querySelectorAll(".file-item");


const selectedFile =
    document.getElementById("selected-file");


const sendFileButton =
    document.getElementById("send-file-button");


const fileRecipient =
    document.getElementById("file-recipient");


const fileResult =
    document.getElementById("file-result");


let selectedFileName =
    "";


// 파일을 클릭했을 때

fileItems.forEach(function (file) {

    file.addEventListener(
        "click",
        function () {


            // 기존 선택 제거

            fileItems.forEach(function (item) {

                item.classList.remove(
                    "selected"
                );

            });


            // 현재 파일 선택

            file.classList.add(
                "selected"
            );


            selectedFileName =
                file.dataset.file;


            selectedFile.textContent =
                selectedFileName;

        }
    );

});


// =========================
// 파일 전송
// =========================

sendFileButton.addEventListener(
    "click",
    function () {


        // 파일을 선택하지 않았을 경우

        if (
            selectedFileName === ""
        ) {

            selectedFile.textContent =
                "먼저 파일을 선택하시오.";

            return;

        }


        const recipient =
            fileRecipient.value;


        const currentTime =
            clwTime.textContent;


        fileResult.innerHTML =

            `${selectedFileName}을
             ${recipient}로 발송했습니다.<br>
             ${currentTime}`;

    }
);

// =========================
// 터치 효과
// =========================

const touchElements =
    document.querySelectorAll(
        "button, select, input, textarea"
    );


touchElements.forEach(function (element) {

    element.addEventListener(
        "touchstart",
        function () {

            element.classList.add(
                "touch-active"
            );

        },
        { passive: true }
    );


    element.addEventListener(
        "touchend",
        function () {

            setTimeout(function () {

                element.classList.remove(
                    "touch-active"
                );

            }, 150);

        },
        { passive: true }
    );

});


// =========================
// 모바일 터치 효과용
// =========================

document.addEventListener(
    "touchstart",
    function (event) {

        const target =
            event.target.closest(
                "button, select, input, textarea"
            );


        if (target) {

            target.classList.add(
                "touch-active"
            );

        }

    },
    { passive: true }
);


document.addEventListener(
    "touchend",
    function (event) {

        const target =
            event.target.closest(
                "button, select, input, textarea"
            );


        if (target) {

            setTimeout(function () {

                target.classList.remove(
                    "touch-active"
                );

            }, 150);

        }

    },
    { passive: true }
);


// =========================
// 화면 초기화
// =========================

window.addEventListener(
    "load",
    function () {

        showScreen(loginScreen);

        employeeNameInput.focus();

    }
);


// =========================
// 숨겨진 이상 현상 페이지
// =========================


const returnArchiveButton =
    document.getElementById(
        "return-archive-button"
    );


// 메인 화면의 Z.png 로고

const mainLogo =
    document.querySelector(
        ".header-logo"
    );



// =========================
// 로고 5회 클릭 감지
// =========================

let logoClickCount =
    0;


let logoClickTimer;


mainLogo.addEventListener(
    "click",
    function () {

        logoClickCount++;


        clearTimeout(
            logoClickTimer
        );


        logoClickTimer =
            setTimeout(
                function () {

                    logoClickCount =
                        0;

                },
                1500
            );


        // 5번 빠르게 클릭하면
        // 숨겨진 이상 현상 기록실로 이동

        if (
            logoClickCount >= 5
        ) {

            logoClickCount =
                0;


            clearTimeout(
                logoClickTimer
            );


            showScreen(
                anomalyScreen
            );

        }

    }
);


// =========================
// 이상 현상 기록실에서
// 메인 화면으로 돌아가기
// =========================

returnArchiveButton.addEventListener(
    "click",
    function () {

        showScreen(
            mainScreen
        );

    }
);
