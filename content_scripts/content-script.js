const VIEWER_URL = "https://www.bridgebase.com/tools/handviewer.html";
const VUL_MAPPER = {
    None: "-",
    All: "b",
    NS: "n",
    WE: "e",
};
const PLAYER_ORDER = ["n", "e", "s", "w", "n"];
const SUIT_MAPPER = {
    notrump: "n",
    spades: "s",
    hearts: "h",
    clubs: "c",
    diamonds: "d",
};
const config = { childList: true };
const bboVieverId = "BBO_viewer_wrapper";

const extractHand = (handElement) => {
    let hand = {};
    let actualSuit = "";
    for (let el of handElement.childNodes) {
        if (el.nodeName === "IMG") {
            const suit = el.src
                .match("(com/)(.*.gif)")[2]
                .replace(".gif", "")[0];
            actualSuit = suit;
            hand = { ...hand, [actualSuit]: "" };
        }
        if (el.nodeName === "#text") {
            hand = { ...hand, [actualSuit]: el.textContent.replace("10", "T") };
        }
    }
    handString = "";
    for (let color of Object.entries(hand)) {
        handString += color[0] + color[1];
    }
    return handString;
};

const extractAuction = (auctionNode, player) => {
    let auctionString = "";
    auctionString += "p".repeat(
        PLAYER_ORDER.findIndex((item) => item === player)
    );
    auctionString += auctionNode.childNodes[0].textContent;
    const suit = auctionNode.childNodes[1].src
        .match("(com/)(.*.gif)")[2]
        .replace(".gif", "");
    auctionString += SUIT_MAPPER[suit];
    if (auctionNode.childNodes[2]) {
        auctionString += auctionNode.childNodes[2].textContent;
    }
    auctionString += "ppp";
    return auctionString;
};

const detectTableMutation = (mutationList, observer) => {
    const parentNode = mutationList[0].target;
    const dealNode = parentNode.querySelector("#tabB_contentD0");
    const tableRowNodes = parentNode.querySelectorAll("#tabB_sgBody0 > tr");
    const baseURL = extractBaseURL();
    if(tableRowNodes[0].children[2].children.length == 2) return;
    observer.disconnect();
    for (const row of tableRowNodes) {
        const contractElement = row.childNodes[2];
        if (contractElement.childNodes.length > 1) {
            const player = row.children[3].textContent.toLowerCase();
            const auction = extractAuction(row.children[2], player);
            addViewerButton(contractElement, auction);
        }
    }
    dealObserver.observe(parentNode, config);

    function extractBaseURL() {
        const metaData = dealNode.querySelector("#tabB_bTitle0");
        const boardNumber = metaData.childNodes[0].textContent;
        const vulKey = metaData.childNodes[1].textContent.split(" ")[0];

        const dealData = {
            w: extractHand(dealNode.querySelector("#tabB_wCards0")),
            e: extractHand(dealNode.querySelector("#tabB_eCards0")),
            n: extractHand(dealNode.querySelector("#tabB_nCards0")),
            s: extractHand(dealNode.querySelector("#tabB_sCards0")),
            v: VUL_MAPPER[vulKey],
            d: "n",
            b: boardNumber,
        };

        return `${VIEWER_URL}?n=${dealData.n}&e=${dealData.e}&s=${dealData.s}&w=${dealData.w}v=${dealData.v}&b=${dealData.b}&d=${dealData.d}`;
    }

    function addViewerButton(contractField, auction) {
        const icon = document.createElement("img");
        icon.src = browser.runtime.getURL("icons/button-ico.png");
        icon.style.height = "16px";
        icon.style.cursor = "pointer";
        const openButton = document.createElement("a");
        openButton.setAttribute("data-auction", `a=${auction}`);
        openButton.appendChild(icon);
        openButton.addEventListener("click", addBBOViewer);
        contractField.appendChild(openButton);
    }

    function addBBOViewer(e) {
        const iframe = document.createElement("iframe");
        iframe.style.width = "300px";
        iframe.style.height = "300px";
        iframe.src = `${baseURL}&${e.currentTarget.dataset.auction}`;

        const div_wrapper = document.createElement("div");
        div_wrapper.style.position = "absolute";
        div_wrapper.style.top = "0px";
        div_wrapper.style.left = "0px";
        div_wrapper.style.zIndex = "100";
        div_wrapper.id = bboVieverId;

        const close_button = document.createElement("button");
        close_button.textContent = "X";
        close_button.style.float = "right";
        close_button.addEventListener("click", () => {
            div_wrapper.remove();
        });
        div_wrapper.appendChild(iframe);
        div_wrapper.appendChild(close_button);
        parentNode.appendChild(div_wrapper);
    }
};

const dealObserver = new MutationObserver(detectTableMutation);

function detectBodyMutation(mutationList, observer) {
    const bodyElement = mutationList[0].target;
    const dealNode = bodyElement.querySelector("#tabB");
    if (dealNode) {
        observer.disconnect();
        dealObserver.observe(dealNode, config);
    }
}

const bodyObserver = new MutationObserver(detectBodyMutation);

browser.runtime.onMessage.addListener((message) => {
    if (message.command === "loadingCompleted") {
        const bodyElement = window.frames[2].document.body;
        if (bodyElement?.id === "myBody") {
            bodyObserver.observe(bodyElement, config);
        }
    }
});
