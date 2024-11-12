import { useEffect } from "react";

export function useKeyDown(key, action) {
  // listen to escape keypress on document
  useEffect(
    function () {
      function callbackEvent(e) {
        if (e.code === key) {
          action();
        }
      }
      document.addEventListener("keydown", callbackEvent);

      return function () {
        document.removeEventListener("keydown", callbackEvent);
      };
    },
    [key, action]
  );
}
