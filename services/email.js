const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ 
  username: "api",
  key: process.env.MAILGUN_API_KEY,
  public_key: process.env.MAILGUN_PUBLIC_KEY
});

async function createAndSendEmail(email, labelLink) {
  const emailMsg = {
    from: "CubbieKit Customer Support <hello@cubbiekit.com>",
    to: [ email ],
    subject: "Download your return shipping label now!",
    html: `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Simple Transactional Email</title>
        <style>
          /* -------------------------------------
              GLOBAL RESETS
          ------------------------------------- */
          
          /*All the styling goes here*/
          
          img {
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100%; 
          }
    
          body {
            background-color: #f6f6f6;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%; 
          }
    
          table {
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%; }
            table td {
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top; 
          }
    
          /* -------------------------------------
              BODY & CONTAINER
          ------------------------------------- */
    
          .body {
            background-color: #f6f6f6;
            width: 100%; 
          }
    
          /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
          .container {
            display: block;
            margin: 0 auto !important;
            /* makes it centered */
            max-width: 580px;
            padding: 10px;
            width: 580px; 
          }
    
          /* This should also be a block element, so that it will fill 100% of the .container */
          .content {
            box-sizing: border-box;
            display: block;
            margin: 0 auto;
            max-width: 580px;
            padding: 10px; 
          }
    
          /* -------------------------------------
              HEADER, FOOTER, MAIN
          ------------------------------------- */
          .main {
            background: #ffffff;
            border-radius: 3px;
            width: 100%; 
          }
    
          .wrapper {
            box-sizing: border-box;
            padding: 20px; 
          }
    
          .content-block {
            padding-bottom: 10px;
            padding-top: 10px;
          }
    
          .footer {
            clear: both;
            margin-top: 20px;
            text-align: center;
          }

          .footer tr {
            width:250px;
            display: block;
            margin:auto;
          }

          .footer td {
            width: 55px;
          }


            .footer a {
              color: #999999;
              font-size: 12px;
              text-align: center; 
          }


    
          /* -------------------------------------
              TYPOGRAPHY
          ------------------------------------- */
          h1,
          h2,
          h3,
          h4 {
            color: #000000;
            font-family: sans-serif;
            font-weight: 400;
            line-height: 1.4;
            margin: 0;
            margin-bottom: 30px; 
          }
    
          h1 {
            font-size: 35px;
            font-weight: 300;
            text-align: center;
            text-transform: capitalize; 
          }
    
          p,
          ul,
          ol {
            font-family: sans-serif;
            font-size: 14px;
            font-weight: normal;
            margin: 0;
            margin-bottom: 15px; 
          }
            p li,
            ul li,
            ol li {
              list-style-position: inside;
              margin-left: 5px; 
          }
    
          a {
            color: #f1c862;
            text-decoration: underline; 
          }
    
          /* -------------------------------------
              BUTTONS
          ------------------------------------- */
          .btn {
            box-sizing: border-box;
            width: 100%; }
            .btn > tbody > tr > td {
              padding-bottom: 15px; }
            .btn table {
              width: auto; 
          }
            .btn table td {
              background-color: #ffffff;
              border-radius: 5px;
              text-align: center; 
          }
            .btn a {
              background-color: #ffffff;
              border: solid 1px #f1c862;
              border-radius: 5px;
              box-sizing: border-box;
              color: #f1c862;
              cursor: pointer;
              display: inline-block;
              font-size: 14px;
              font-weight: bold;
              margin: 0;
              padding: 12px 25px;
              text-decoration: none;
              text-transform: capitalize; 
          }
    
          #button-container {
            margin-top: 42px;
            margin-bottom: 42px;
          }
    
          .btn-primary {
            background-color: #f1c862;
            text-align: center;
            max-width: 300px;
            margin: auto;
            display: block;
            margin-bottom: 20px;
          }
    
          .btn-primary a {
            background-color: #f1c862;
            border-color: #f1c862;
            color: #ffffff; 
          }
    
          /* -------------------------------------
              OTHER STYLES THAT MIGHT BE USEFUL
          ------------------------------------- */
          .last {
            margin-bottom: 0; 
          }
    
          .first {
            margin-top: 0; 
          }
    
          .align-center {
            text-align: center; 
          }
    
          .align-right {
            text-align: right; 
          }
    
          .align-left {
            text-align: left; 
          }
    
          .clear {
            clear: both; 
          }
    
          .mt0 {
            margin-top: 0; 
          }
    
          .mb0 {
            margin-bottom: 0; 
          }
    
          .preheader {
            color: transparent;
            display: none;
            height: 0;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            mso-hide: all;
            visibility: hidden;
            width: 0; 
          }
    
          .powered-by a {
            text-decoration: none; 
          }
    
          hr {
            border: 0;
            border-bottom: 1px solid #f6f6f6;
            margin: 20px 0; 
          }
    
          /* -------------------------------------
              RESPONSIVE AND MOBILE FRIENDLY STYLES
          ------------------------------------- */
          @media only screen and (max-width: 620px) {
            table[class=body] h1 {
              font-size: 28px !important;
              margin-bottom: 10px !important; 
            }
            table[class=body] p,
            table[class=body] ul,
            table[class=body] ol,
            table[class=body] td,
            table[class=body] span,
            table[class=body] a {
              font-size: 16px !important; 
            }
            table[class=body] .wrapper,
            table[class=body] .article {
              padding: 10px !important; 
            }
            table[class=body] .content {
              padding: 0 !important; 
            }
            table[class=body] .container {
              padding: 0 !important;
              width: 100% !important; 
            }
            table[class=body] .main {
              border-left-width: 0 !important;
              border-radius: 0 !important;
              border-right-width: 0 !important; 
            }
            table[class=body] .btn table {
              width: 100% !important; 
            }
            table[class=body] .btn a {
              width: 100% !important; 
            }
            table[class=body] .img-responsive {
              height: auto !important;
              max-width: 100% !important;
              width: auto !important; 
            }
          }
    
          /* -------------------------------------
              PRESERVE THESE STYLES IN THE HEAD
          ------------------------------------- */
          @media all {
            .ExternalClass {
              width: 100%; 
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%; 
            }
            .apple-link a {
              color: inherit !important;
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              text-decoration: none !important; 
            }
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
              font-size: inherit;
              font-family: inherit;
              font-weight: inherit;
              line-height: inherit;
            }
            .btn-primary table td:hover {
              background-color: #D9B559 !important; 
            }
            .btn-primary a:hover {
              background-color: #D9B559 !important;
              border-color: #D9B559 !important; 
            } 
          }
    
          #logo-container {
            width: 100%;
            border-bottom: 1px solid #121213;
            margin-bottom: 20px;
          }
    
          #logo {
            display: block;
            margin: 12px auto;
          }
    
          .header-message {
            color: #121213;
            font-weight: normal;
            font-size: 18px;
          }
    
          .full p {
            font-size: 16px;
            line-height: 2;
          }
    
          .full p strong {
            font-size: 17px;
          }
    
          #main-image-container {
            width: 100%;
            margin-bottom: 20px;
          }
    
          #main-image {
            display:block;
            max-width: 100%:
            margin: 0 auto;
          }
    
        </style>
      </head>
      <body class="">
        <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
          <tr>
            <td>&nbsp;</td>
            <td class="container">
              <div class="content">
    
                <!-- START CENTERED WHITE CONTAINER -->
                <table role="presentation" class="main">
    
                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <div id="logo-container">
                              <img 
                                src="https://res.cloudinary.com/tumulty-web-services/image/upload/v1630446939/cubbiekit/email/cubbiekit-logo.png"
                                alt="cubbie kit"
                                height="35"
                                width="145"
                                id="logo"  
                              /> 
                            </div>
                            <p class="header-message">Thanks for closing the loop with us!</p>
                            <div id="main-image-container">
                              <img
                                src="https://res.cloudinary.com/tumulty-web-services/image/upload/v1630446940/cubbiekit/email/cubbie-kit-message.png"
                                alt="easy for you, soft for baby, good for the planet"
                                width="1080"
                                height="auto"
                                id="main-image"
                              />
                            </div>
                            <div class="full">
                              <p>Your shipping label is ready to download. Click the button below to download and print your label.</p>
                              <p>A few quick notes:</p>
                              <p>1) Please don't send any other brand's merchandise to us! We hold our clothing to strict quality standards and our 100% GOTS organic cottom cannot be upcycled with unverfied yarns and dies.</p>
                              <p>2) Please send clean clothes! Partner charities that we work with are often under resourced and cannot manage the additional laundry.</p>
                              <p>As a thank you for supporting our mission, here is 5% off your nexto order: <strong>2BHE4NH7AEVR</strong></p>
                            </div>
                            <div id="button-container">
                              <div class="btn btn-primary">
                                <a href="https://www.cubbiekit.com/discount/2BHE4NH7AEVR" download>Claim your code</a>
                              </div>
                              <div class="btn btn-primary">
                                <a href="${labelLink}" download>Download return label</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
    
                <!-- END MAIN CONTENT AREA -->
                </table>
                <!-- END CENTERED WHITE CONTAINER -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="footer">
                    <tr>
                     <td>
                        <a href="https://www.facebook.com/cubbiekit" target="_blank" rel="noreferrer noopener">
                          <img
                            src="https://res.cloudinary.com/tumulty-web-services/image/upload/v1630449868/cubbiekit/email/Screen_Shot_2021-08-31_at_6.43.42_PM.png"
                            alt="facebook"
                            width="20"
                            height="35"
                          />
                        </a>
                     </td>
                     <td>
                      <a href="https://twitter.com/cubbiekit" target="_blank" rel="noreferrer noopener">
                        <img
                          src="https://res.cloudinary.com/tumulty-web-services/image/upload/v1630449867/cubbiekit/email/Screen_Shot_2021-08-31_at_6.42.54_PM.png"
                          alt="twitter"
                          width="37"
                          height="35"
                        />
                      </a>
                    </td>
                     <td>
                        <a href="https://www.instagram.com/cubbiekit/" target="_blank" rel="noreferrer noopener">
                          <img
                            src="https://res.cloudinary.com/tumulty-web-services/image/upload/v1630449868/cubbiekit/email/Screen_Shot_2021-08-31_at_6.42.59_PM.png"
                            alt="instagram"
                            width="36"
                            height="35"
                          />
                        </a>
                     </td>
                     <td>
                        <a href="https://www.pinterest.com/cubbiekit/" target="_blank" rel="noreferrer noopener">
                            <img
                              src="https://res.cloudinary.com/tumulty-web-services/image/upload/v1630449867/cubbiekit/email/Screen_Shot_2021-08-31_at_6.43.13_PM.png"
                              alt="pinterest"
                              width="41"
                              height="35"
                            />
                        </a>
                     </td>
                    </tr>
                </table>          
              </div>
            </td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>
    `
  };

 const send = await mg.messages.create(process.env.MAILGUN_DOMAIN_SANDBOX, emailMsg)
  .then(msg => msg)
  .catch(err => err);
  
  return send;
}

module.exports = createAndSendEmail;