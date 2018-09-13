import PlayBook from "../index.js";
import "./style.css";

const ball = document.querySelector(".ball");
const text = document.querySelector(".loading-text");

const spinnerAnimation = {
  scenes: [
    {
      keyframes: [
        {
          from: 1,
          to: 2
        },
        {
          from: 2,
          to: 0.5
        },
        {
          from: 0.5,
          to: 2
        },
        {
          from: 2,
          to: 1
        }
      ],
      options: {
        cb: progress =>
          (ball.style.transform = `scale(${progress}) rotate(${progress *
            360}deg)`),
        ease: t => 1 + --t * t * t * t * t,
        duration: 400
      }
    },
    {
      keyframes: [
        {
          from: 100,
          to: 10
        },
        {
          from: 10,
          to: 100
        },
        {
          from: 100,
          to: 10
        },
        {
          from: 10,
          to: 100
        }
      ],
      options: {
        cb: progress => (ball.style.borderRadius = `${progress}%`),
        ease: t => 1 + --t * t * t * t * t,
        duration: 400
      }
    },
    {
      keyframes: [
        { background: "#FD8243" },
        { background: "#D85F51" },
        { background: "#FD8243" }
      ],
      options: {
        element: ball,
        animationApi: true,
        duration: 1600,
        ease: "cubic-bezier(0.785, 0.135, 0.15, 0.86)"
      }
    }
  ],
  loop: true,
  async: true,
  delay: 2000
};

const textAnimation = {
  scenes: [
    {
      keyframes: [
        {
          from: 0,
          to: 10
        },
        {
          from: 10,
          to: 10,
          duration: 300
        },
        {
          from: 10,
          to: -50
        },
        {
          from: -50,
          to: 0
        },
        {
          from: 0,
          to: 0,
          duration: 700
        }
      ],
      options: {
        cb: progress => (text.style.transform = `translateY(${progress}%)`),
        ease: t => 1 + --t * t * t * t * t,
        duration: 200
      }
    },
    {
      keyframes: [{ opacity: 1 }, { opacity: 0.7 }, { opacity: 1 }],
      options: {
        element: text,
        animationApi: true,
        duration: 1600,
        ease: "cubic-bezier(0.785, 0.135, 0.15, 0.86)"
      }
    }
  ],
  loop: true,
  async: true
};

new PlayBook(spinnerAnimation);
new PlayBook(textAnimation);
