export function viewTemplate(moduleName: string) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="<?= BASE_URL ?>test_module/css/custom.css">
            <title>My new Trongate module</title>
    </head>
    <body>
        <div class="wrapper">
            <div>
            <a href="https://github.com/jakecastelli/trongate-vscode" rel="noopener" target="_blank" title="Keep Updated on Github"><svg class="octocat" viewBox="0 0 250 250"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path class="octocat-arm" d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"></path><path class="octocat-body" d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"></path></svg></a>
            </div>
            <div>
                <h1>Hello from <span><i>test2</i></span> module</h1>
                    <p>This view was generated using Trongate Scaffold & Code Snippets!</p>
                    <div class="buttons">
                        <div class="button">
                            <a href="https://trongate.io/" target="_blank">Trongate</a>
                        </div>
            
                        <div class="button">
                        <a href="https://www.speedcodingacademy.com/" target="_blank">Speed Coding Academy</a>
                        </div>
                    </div>
            </div>
            <div class="footer">
                <div class="msg">Hello there, we hope you are enjoying the Trongate extension which was brought to you by Jake Castelli and Simon Field.  If you haven't already joined Speed Coding Academy, do your self a favour and JOIN NOW! by clicking on the button above, and don't forget to check out Trongate.io</div>
            </div>
        </div>
    
        <script src="<?= BASE_URL ?>test2_module/js/custom.js"></script>    
    </body>
    </html>`;
}

export function getTrongateModuleCss() {
    return `@import url("https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");
    
    
    body {
      background: rgb(251, 178, 165);
      margin: 0;
    }
    
    body, .wrapper {
      min-height: 100vh;
    }
    
    .wrapper {
      width: 100%;
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
    }
    
    h1 {
      margin-top: 50px;
      font-family: "Balsamiq Sans", cursive;
      font-size: 3.8rem;
      
    }
    
    p {
      font-family: "Indie Flower", cursive;
      font-size: 1.8rem;
    }
    
    h1 span {
      color: rgb(119, 79, 79);
    }
    
    .buttons {
      margin-top: 50px;
    }
    
    .button {
      background-color: #a7450b;
      border: none;
      color: white;
      padding: 12px 24px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border-radius: 15px;
      min-width: 150px;
    }
    
    a {
      text-decoration: none;
      color: rgb(231, 225, 225);
      font-weight: bold;
    }
    
    a:hover {
      color: white;
      transition: 0.3s;
    }
    
    .octocat {
      border: 0;
      color: #f4f5f6;
      fill: #a7450b;
      height: 5.2rem;
      position: fixed;
      right: 0;
      top: 0;
      width: 5.2rem;
      z-index: 2
    }
    
    .octocat:hover .octocat-arm {
      animation: b .56s infinite;
      transform-origin: 13rem 5.6rem
    }
    
    .octocat .octocat-arm,
    .octocat .octocat-body {
      fill: #f4f5f6
    }
    
    @keyframes b {
      0%,
      50% {
        transform: rotate(0)
      }
      25%,
      75% {
        transform: rotate(-25deg)
      }
    }
    
    @keyframes slide {
      from { left:100%; transform: translate(0, 0); }
      to { left:-100%; transform: translate(-100%, 0); }
    }
    @-webkit-keyframes slide {
      from { left:100%; transform: translate(0, 0); }
      to { left:-100%; transform: translate(-100%, 0); }
    }
    
    .footer {
      font-family: "Balsamiq Sans", cursive;
      font-size: 2rem;
      color: rgb(119, 79, 79); 
      height: 120px;
      line-height: 120px;
      overflow: hidden;
      position: relative;
    }
    
    .msg {
      position: absolute;
      top: 0;
      white-space: nowrap;
      height: 120px;
      animation-name: slide;
      animation-duration: 25s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      -webkit-animation-name: slide;
      -webkit-animation-duration: 25s;
      -webkit-animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
    }
    
    @media screen and (max-width: 768px) {
     
      h1 {
        font-size: 2rem;
      }
    
      p {
        font-size: 1rem;
      }
    
      .button {
        padding: 8px 10px;
      }
      
      .footer {
        font-size: 1rem;
      }
    }`;
}