// =========================
// 기본 변수
// =========================

const loginScreen =
    document.getElementById("login-screen");

const loadingScreen =
    document.getElementById("loading-screen");

const mainScreen =
    document.getElementById("main-screen");

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

const returnArchiveButton =
    document.getElementById("return-archive-button");

const mainLogo =
    document.querySelector(".header-logo");


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
// 특정 인물 전용 테마
// =========================

function changeTheme(name) {

    document.body.classList.remove(
        "theme-special"
    );


    if (
        name === "주성지"
    ) {

        document.body.classList.add(
            "theme-special"
        );

    }

}


// =========================
// 입장 기능
// =========================

enterButton.addEventListener(
    "click",
    function () {

        const employeeName =
            employeeNameInput.value.trim();


        if (employeeName === "") {

            employeeNameInput.focus();

            return;

        }


        userName.textContent =
            employeeName;

        changeTheme(
            employeeName
        );


        showScreen(
            loadingScreen
        );


        loadingProgress.style.width =
            "0%";


        setTimeout(
            function () {

                loadingProgress.style.width =
                    "100%";

            },
            100
        );


        setTimeout(
            function () {

                showScreen(
                    mainScreen
                );

            },
            1500
        );

    }
);


// =========================
// 엔터키로 입장
// =========================

employeeNameInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            enterButton.click();

        }

    }
);


// =========================
// 로그아웃
// =========================

logoutButton.addEventListener(
    "click",
    function () {

        showScreen(
            loginScreen
        );


        employeeNameInput.value =
            "";


        userName.textContent =
            "UNKNOWN";

        document.body.classList.remove(
            "theme-special"
        );


        employeeNameInput.focus();

    }
);


// =========================
// CLW 시간
// =========================

const clwTime =
    document.getElementById("clw-time");


function updateCLWTime() {

    const now =
        new Date();


    const hours =
        String(
            now.getHours()
        ).padStart(
            2,
            "0"
        );


    const minutes =
        String(
            now.getMinutes()
        ).padStart(
            2,
            "0"
        );


    const seconds =
        String(
            now.getSeconds()
        ).padStart(
            2,
            "0"
        );


    clwTime.textContent =
        `CLW ${hours}:${minutes}:${seconds}`;

}


updateCLWTime();


setInterval(
    updateCLWTime,
    1000
);


// =========================
// 메시지 전송
// =========================

const messageRecipient =
    document.getElementById(
        "message-recipient"
    );

const messageInput =
    document.getElementById(
        "message-input"
    );

const sendMessageButton =
    document.getElementById(
        "send-message-button"
    );

const messageResult =
    document.getElementById(
        "message-result"
    );


sendMessageButton.addEventListener(
    "click",
    function () {

        const message =
            messageInput.value.trim();


        if (
            message === ""
        ) {

            messageInput.focus();

            return;

        }


        const recipient =
            messageRecipient.value;


        const currentTime =
            clwTime.textContent;


        messageResult.innerHTML =

            `MESSAGE SENT<br><br>

             TO: ${recipient}<br>

             CONTENT: ${message}<br><br>

             ${currentTime}`;


        messageInput.value =
            "";

    }
);


// =========================
// 파일 선택
// =========================

const fileItems =
    document.querySelectorAll(
        ".file-item"
    );

const selectedFile =
    document.getElementById(
        "selected-file"
    );

const sendFileButton =
    document.getElementById(
        "send-file-button"
    );

const fileRecipient =
    document.getElementById(
        "file-recipient"
    );

const fileResult =
    document.getElementById(
        "file-result"
    );


let selectedFileName =
    "";


fileItems.forEach(
    function (file) {

        file.addEventListener(
            "click",
            function () {


                fileItems.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                file.classList.add(
                    "selected"
                );


                selectedFileName =
                    file.dataset.file;


                selectedFile.textContent =
                    selectedFileName;

            }
        );

    }
);


// =========================
// 파일 전송
// =========================

sendFileButton.addEventListener(
    "click",
    function () {

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
            `${selectedFileName}을 ${recipient}로 발송했습니다.<br>
             ${currentTime}`;

    }
);


// =========================
// 숨겨진 이상 현상 기록실
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


        if (
            logoClickCount >= 5
        ) {

            logoClickCount =
                0;


            clearTimeout(
                logoClickTimer
            );


            const firstConfirm =
                confirm(
                    "접속하시겠습니까?"
                );


            if (
                !firstConfirm
            ) {

                return;

            }


            const secondConfirm =
                confirm(
                    "접속 시 발생하는 문제는 책임지지 않습니다."
                );


            if (
                !secondConfirm
            ) {

                return;

            }


            const thirdConfirm =
                confirm(
                    "마지막으로 질문합니다. 접속하시겠습니까?"
                );


            if (
                !thirdConfirm
            ) {

                return;

            }


            showScreen(
                anomalyScreen
            );

        }

    }
);


// =========================
// 기록실에서 돌아가기
// =========================

returnArchiveButton.addEventListener(
    "click",
    function () {

        showScreen(
            mainScreen
        );

    }
);


// =========================
// 터치 효과
// =========================

document.addEventListener(
    "touchstart",
    function (event) {

        const target =
            event.target.closest(
                "button, select, input, textarea"
            );


        if (
            target
        ) {

            target.classList.add(
                "touch-active"
            );

        }

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    function (event) {

        const target =
            event.target.closest(
                "button, select, input, textarea"
            );


        if (
            target
        ) {

            setTimeout(
                function () {

                    target.classList.remove(
                        "touch-active"
                    );

                },
                150
            );

        }

    },
    {
        passive: true
    }
);


// =========================
// 화면 초기화
// =========================

window.addEventListener(
    "load",
    function () {

        showScreen(
            loginScreen
        );


        employeeNameInput.focus();

    }
);
