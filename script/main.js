// Animation Timeline
const animationTimeline = () => {
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span>`;
    hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg",
    };

    const tl = new TimelineMax();
    tl.to(".container", 0.1, { visibility: "visible" })
      .from(".one", 0.7, { opacity: 0, y: 10 })
      .from(".two", 0.4, { opacity: 0, y: 10 })
      .to(".one", 0.7, { opacity: 0, y: 10 }, "+=2.5")
      .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
      .from(".three", 0.7, { opacity: 0, y: 10 })
      .to(".three", 0.7, { opacity: 0, y: 10 }, "+=2")
      .from(".four", 0.7, { scale: 0.2, opacity: 0 })
      .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
      .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.05)
      .to(".fake-btn", 0.1, { backgroundColor: "rgb(127, 206, 248)" })
      .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=0.7")
      .from(".idea-1", 0.7, ideaTextTrans)
      .from(".idea-2", 0.7, ideaTextTrans)
      .from(".idea-3", 0.7, ideaTextTrans)
      .from(".idea-4", 0.7, ideaTextTrans)
      .from(".idea-5", 0.7, { rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 }, "+=0.5")
      .from(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: 15, ease: Expo.easeOut }, 0.2)
      .staggerFromTo(".baloons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)
      .from(".lydia-dp", 0.5, { scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 }, "-=2")
      .from(".hat", 0.5, { x: -100, y: 350, rotation: -180, opacity: 0 })
      .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: Elastic.easeOut.config(1, 0.5) }, 0.1)
      .from(".wish h5", 0.5, { opacity: 0, y: 10, skewX: "-15deg" }, "party")
      .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1" })
      .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
      .to(".last-smile", 0.5, { rotation: 90 }, "+=1");

    // 音楽オブジェクトを取得
    const birthdayMusic = document.getElementById("birthdayMusic");

    // ページが読み込まれた時に音楽を再生
    birthdayMusic.volume = 1.0; // 音量を最大に
    birthdayMusic.play().catch((error) => {
        console.error('音楽再生に失敗しました:', error);
    });

    // メッセージがクリックされたときのイベントリスナーを追加
    const clickMessage = document.getElementById("click-message");
    clickMessage.addEventListener("click", () => {
        birthdayMusic.currentTime = 0; // 音楽を最初に戻す
        tl.restart();
    });
};

// JSONファイルからデータを取得
const fetchData = () => {
    fetch("customize.json")
        .then(response => response.json())
        .then(data => {
            Object.keys(data).forEach(key => {
                if (data[key] !== "") {
                    if (key === "imagePath") {
                        document.getElementById(key).setAttribute("src", data[key]);
                    } else {
                        document.getElementById(key).innerText = data[key];
                    }
                }
            });
        });
};

// フェッチとアニメーションを順番に実行
const resolveFetch = () => {
    return new Promise((resolve) => {
        fetchData();
        resolve("Fetch done!");
    });
};

resolveFetch().then(animationTimeline);
