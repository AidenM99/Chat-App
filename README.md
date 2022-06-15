## Chat App
A chat application with CRUD functionalities where users can chat in real‑time.

- Live Demo: https://chat-app-4cf40.web.app/

## Technologies Used
This project was built using:
- HTML5
- CSS3
- JavaScript
- React
- React Router
- Material UI
- Firebase
- Webpack

## Features
- Features user authentication. Sign in with a Google account.
- Create private chats and/or group chats. Add users to an existing chat and leave chats.
- Send and delete text messages, images, emojis or GIFs facilitated by the Giphy API.
- Images are resized and converted to WebP format and GIFs are converted to MP4 format before being saved to provide an optimised experience.
- Switch between light and dark mode. The user’s preference is saved to local storage for continued use.
- Responsive.

## Challenges
This application uses Firebase to store user data and chat data. Firebase was completely new to me at the time of building the application,
and therefore provided a challenge during the initial learning curve. The syntax itself was relatively simple, however the real challenge
was figuring out how to structure my data in a way that made sense and conformed to Firebase's rules for storing and retrieving data i.e. 
Firebase disallows querying using multiple "array-contains" clauses. 

Additionally, when building this application, I encountered the useContext and useMemo hooks for the first time. Figuring out how these hooks
worked, what their best use cases are and why they should be used in the first place (useMemo vs useEffect + useState) took some reading of 
documentation, however I'm glad I took the time to research them as I can definitely see their value now.