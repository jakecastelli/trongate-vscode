export function viewTemplate(moduleName: string) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="<?= BASE_URL ?>${moduleName}_module/css/custom.css">
        <title>My new Trongate module</title>
    </head>
    
    <body>
        <div class="wrapper">
            <h1>Hello from <span><i>${moduleName}</i></span> module</h1>
            <p>This view was generated using Trongate Scaffold & Code Snippets!</p>
            <div class="buttons">
                <div class="button">
                    <a href="https://github.com/jakecastelli/trongate-vscode">Keep updated here
                    </a>
                </div>
    
                <div class="button">
                    <a href="https://https://trongate.io/">Trongate</a>
                </div>
            </div>
        </div>
        <script src="<?= BASE_URL ?>${moduleName}_module/js/custom.js"></script>
    </body>
    
    </html>
    `;
}

export function getTrongateModuleCss() {
    return `@import url("https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");
    body {
      background-color: rgb(251, 178, 165);
    }
    
    h1 {
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
    
    .wrapper {
      margin-top: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
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
    }
    `;
}