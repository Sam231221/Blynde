module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: [".81rem", "1rem"],
      },
      screens: {
        xs: "340px",
      },
      //custom
      backgroundImage: {
        "chat-background": "url('/bgChat.jpg')",
      },
      colors: {
        secondary: "#8696a0",
        "teal-light": "#7ae3c3",
        "photopicker-overlay-background": "rgba(30,42,49,0.8)",
        "dropdown-background": "#233138",
        "dropdown-background-hover": "#182229",
        "input-background": " #F3F3F5",
        "primary-strong": "#e9edef",
        "panel-header-background": "#F3F3F5",
        "panel-header-icon": "#3f3f3f",
        "icon-lighter": "#8696a0",
        "icon-skyblue": "#3597DA",
        "search-input-container-background": "#dddddd",
        "conversation-border": "rgba(134,150,160,0.15)",
        "conversation-panel-background": "#EEF2FA",
        "background-default-hover": "#F3F3F5",
        "incoming-background": "#ffffff",
        "outgoing-background": "#3597DA",
        "bubble-meta": "hsla(0,0%,100%,0.6)",
        "icon-ack": "#53bdeb",
        primaryTextColor: "#013685",
        secondaryTextColor: "#4154F1",
        ternaryTextColor: "#899bbd",
        forteryTextColor: "#51678f",
        primaryBgColor: "#F0F2F5",
        secondaryBgColor: "#f6f6fe",
        ternaryBgColor: "#F3F3F5",
      },
      gridTemplateColumns: {
        main: "1fr 2.4fr",
      },
    },
  },
  plugins: [],
};
