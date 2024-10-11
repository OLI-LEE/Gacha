
    // 定義各類別的已收集卡片集合，用來追蹤收集進度
        var collectedCards = {
            N: new Set(),
            R: new Set(),
            SR: new Set(),
            SSR: new Set()
        };

    // 定義每個類別所需收集的卡片總數
        var fullCollection = {
            N: 6,
            R: 5,
            SR: 3,
            SSR: 3
        };

    // 用於追蹤各類別已收集到的獨特卡片數量
        var cardCounts = {
            SSR: 0,
            SR: 0,
            R: 0,
            N: 0
        };

    // 記錄抽卡次數中，累計抽過的每種卡片數量（包括重複）
        var totalCounts = {
            SSR: 0,
            SR: 0,
            R: 0,
            N: 0
        };

        var count = 0; // 累計抽卡張數
        var count1 = 0; // 抽卡次數
        var text = ""; // 抽卡結果顯示文本
        var cardImages = []; // 儲存卡片圖片路徑的陣列

    // 控制是否已顯示收集完成訊息的旗標
        var shownMessages = {
            N: false,
            R: false,
            SR: false,
            SSR: false
        };

    // 儲值功能，允許使用者新增金額
        function deposit() {
        const amount = prompt("請輸入儲值金額：");

    // 使用正則表達式檢查輸入是否為有效的正整數（只允許數字且大於零）
    if (amount && /^\d+$/.test(amount) && parseInt(amount, 10) > 0) {
        const balanceElement = document.getElementById("balance");
        const currentBalance = parseInt(balanceElement.innerText.replace("目前金額: ", ""), 10);
        const newBalance = currentBalance + parseInt(amount, 10);
        balanceElement.innerText = `目前金額: ${newBalance}`;
        alert(`儲值成功！金額：${amount}`);
    } else {
        alert("請輸入有效的金額！只能輸入正整數，不能包含字母或符號！");
        }
    }

    // 抽卡功能，可抽指定數量的卡片
        function drawCard(countToDraw) {
            var balanceElement = document.getElementById("balance");
            var currentBalance = parseInt(balanceElement.innerText.replace("目前金額: ", ""));
            var cost = countToDraw * 10; // 每張卡片成本 10

            if (currentBalance < cost) {
                alert("金額不足，請儲值！");
                return;
            }

    // 扣除相應金額
        currentBalance -= cost;
        balanceElement.innerText = "目前金額: " + currentBalance;

        
        text = ""; // 每次抽卡時初始化

        // 重複抽卡 countToDraw 次
            for (var i = 0; i < countToDraw; i++) {
                var x = Math.floor(Math.random() * 100) + 1;
                if (x <= 2) {
                    ssr();
                } else if (x <= 12) {
                    sr();
                } else if (x <= 42) {
                    r();
                } else {
                    n();
                }
            }

            document.getElementById("demo").innerHTML = text; // 更新只顯示這次抽卡的內容
            document.getElementById("count").innerHTML = (count += countToDraw); // 累計抽卡張數
            document.getElementById("count1").innerHTML = (++count1); // 抽卡次數累加
            updateCollectionStatus(); // 更新收集進度
        }

        // 單抽（抽1張卡）
        function one() {
            drawCard(1);
        }

    
        // 十連抽（抽5張卡）
        function five() {
            drawCard(5);
        }

        // 根據卡片稀有度與可選編號生成隨機卡片
        function generateCard(rarity, maxCount) {
            var ran = Math.floor(Math.random() * maxCount) + 1;
            var imagePath = "image/" + rarity + ran + ".jpg";
            cardImages.push(imagePath); // 將圖片路徑加入陣列
            return ran; // 返回隨機生成的數字
        }

        function ssr() {
            var cardNumber = generateCard("SSR", fullCollection.SSR);
            collectedCards.SSR.add(cardNumber); // 記錄已收集的SSR卡片
            totalCounts.SSR++; // 計算共抽過的SSR卡片
            text += "<div style='margin:8px 8px; float:left; text-align:center;'><img src='image/SSR" + cardNumber + ".jpg'class='animated-card ssr-3d-spin'></div>"; // 顯示抽到的卡片
            cardCounts.SSR = collectedCards.SSR.size; // 更新已收集數
            document.getElementById("countssr").innerHTML = totalCounts.SSR;
            showCongratsMessage(); // 顯示恭喜訊息
        }

        function sr() {
            var cardNumber = generateCard("SR", fullCollection.SR);
            collectedCards.SR.add(cardNumber); // 記錄已收集的SR卡片
            totalCounts.SR++; // 計算共抽過的SR卡片
            text += "<div style='margin:8px 8px; float:left; text-align:center;'><img src='image/SR" + cardNumber + ".jpg';></div>"; // 顯示抽到的卡片
            cardCounts.SR = collectedCards.SR.size; // 更新已收集數

            document.getElementById("countsr").innerHTML = totalCounts.SR;
        }

        function r() {
            var cardNumber = generateCard("R", fullCollection.R);
            collectedCards.R.add(cardNumber); // 記錄已收集的R卡片
            totalCounts.R++; // 計算共抽過的R卡片
            text += "<div style='margin:8px 8px; float:left; text-align:center;'><img src='image/R" + cardNumber + ".jpg' ></div>"; // 顯示抽到的卡片
            cardCounts.R = collectedCards.R.size; // 更新已收集數
            document.getElementById("countr").innerHTML = totalCounts.R;
        }

        function n() {
            var cardNumber = generateCard("N", fullCollection.N);
            collectedCards.N.add(cardNumber); // 記錄已收集的N卡片
            totalCounts.N++; // 計算共抽過的N卡片
            text += "<div style='margin:8px 8px; float:left; text-align:center;'><img src='image/N" + cardNumber + ".jpg' ></div>"; // 顯示抽到的卡片
            cardCounts.N = collectedCards.N.size; // 更新已收集數
            document.getElementById("countn").innerHTML = totalCounts.N;
        }

        function updateCollectionStatus() {
            document.getElementById("nCollected").innerText = collectedCards.N.size; // 顯示獨特款式的數量
            document.getElementById("rCollected").innerText = collectedCards.R.size;
            document.getElementById("srCollected").innerText = collectedCards.SR.size;
            document.getElementById("ssrCollected").innerText = collectedCards.SSR.size;
            
            // 更新各類卡片累計數（包括重複的）
            document.getElementById("countssr").innerText = totalCounts.SSR;
            document.getElementById("countsr").innerText = totalCounts.SR;
            document.getElementById("countr").innerText = totalCounts.R;
            document.getElementById("countn").innerText = totalCounts.N;

            // 檢查是否收集完全部卡片並顯示恭喜訊息
            for (const area in fullCollection) {
                if (cardCounts[area] === fullCollection[area] && !shownMessages[area]) {
                    alert(area + " 區已收集完成，恭喜！");
                    shownMessages[area] = true; // 標記為已顯示過
                }
            }

            // 檢查所有區域是否全部已收集完成
            if (cardCounts.N === fullCollection.N &&
                cardCounts.R === fullCollection.R &&
                cardCounts.SR === fullCollection.SR &&
                cardCounts.SSR === fullCollection.SSR) {
                alert("恭喜！您已經收集完所有區域的卡片！");
            }
        }

        // 排序卡片圖片並顯示
        function sortImages() {
            cardImages.sort();
            var sortedText = cardImages.map(img =>
                 "<div style='margin:8px 8px; float:left; text-align:center;'><img src='" + img + "'></div>" // 移除固定的寬高
            ).join("");
            document.getElementById("demo2").innerHTML = sortedText;
        }

        // 顯示恭喜訊息的函式，顯示特定的訊息並在2秒後隱藏
        function showCongratsMessage() {
            var congratsMsg = document.getElementById("congratsMsg"); // 獲取恭喜訊息的元素
            congratsMsg.style.display = "block"; // 顯示訊息
            congratsMsg.classList.add("show"); // 添加顯示動畫的類別
            setTimeout(function () {
                congratsMsg.classList.remove("show"); // 移除顯示動畫的類別
                congratsMsg.style.display = "none";  // 隱藏訊息
            }, 2000); // 2秒後隱藏
        }

