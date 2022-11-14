// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export const BookDetails = () => {
//   const { bookId } = useParams();
//   const [book, setBooks] = useState({});
//   const [genres, setGenre] = useState([]);
//   const [foundGenres, setFoundGenres] = useState([]);
//   const [canAddBook, setCanAddBook] = useState(true);
//   const [currentlyReading, setCurrentlyReading] = useState([]);

//   const navigate = useNavigate();
//   const BookaholicUser = localStorage.getItem("bookaholic_user");
//   const bookaholicUserObj = JSON.parse(BookaholicUser);

//   useEffect(() => {
//     fetch(`http://localhost:8088/CurrentlyReadingBook`)
//       .then((response) => response.json())
//       .then((currentlyReadingArray) => {
//         setCurrentlyReading(currentlyReadingArray);
//       });
//   }, [bookId]);

//   useEffect(() => {
//     fetch(`http://localhost:8088/ownedBooks`)
//       .then((response) => response.json())
//       .then((OwnedBookArray) => {
//         const foundBook = OwnedBookArray.find(
//           (ownedBook) =>
//             ownedBook.bookId === parseInt(bookId) &&
//             bookaholicUserObj.id === ownedBook.userId
//         );
//         setCanAddBook(!foundBook);
//       });
//   }, []);
//   /*
//   1. create a use effect and use state that watches for the change in the use params wich is equal to the book ID

//   2. fetch the book obj from the API

//   3. then turn the response to javascript

//   4. then take that data and set it to a sigleBook variable. Since there will be only one I can use the index position of 0 in the data

//   5. setbooks to the single book variable created in setp 4
// */
//   useEffect(() => {
//     fetch(`http://localhost:8088/books?id=${bookId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         const singleBook = data[0];
//         setBooks(singleBook);
//       });
//   }, [bookId]);

//   /*
//   1. create a useEffect and useState that is watching for the intial load

//   2. fetch the bookgenres with expand to so that I have the book information and the genre name

//   3. then take the response and turn it into javascript

//   4. then take that data and set it equal to genreArray variable

//   5. setGenre equal to genreArray
// */
//   useEffect(() => {
//     fetch(`http://localhost:8088/bookGenres?_expand=book&_expand=genre`)
//       .then((response) => response.json())
//       .then((data) => {
//         const genreArray = data;
//         setGenre(genreArray);
//       });
//   }, []);
//   /*
//   1. create a useEffect and a usestate for foundGenres and setFoundGenres that watches for the change in state of book and genres.

//   2. create a variable called filteredGenres and set it equal to the resut of .filter on the genres for each genre check if the genre.bookId is equal to the book.id

//   3. setFoundGenres equal to the .map of the variable filteredGenres and return the genre.name
// */
//   useEffect(() => {
//     const filteredGenres = genres.filter((genre) => genre.bookId === book.id);
//     setFoundGenres(
//       filteredGenres.map((filteredGenre) => {
//         return filteredGenre?.genre?.name;
//       })
//     );
//   }, [book, genres]);

//   /*
//     1. create AddBook function that takes in the event from the click

//     2. create a new object called newOwnedBook that will be used to send to the API

//     3. Fetch owned books fromt he API and use the POST method to add the newOwnedBook to the API

//     4. create an alert that notifies the user that the update has been made and then navigate them to the home screen (/)
//   */
//   const addBookToOwnedBooksButton = (event) => {
//     event.preventDefault();
//     const newOwnedBook = {
//       bookId: book.id,
//       userId: bookaholicUserObj.id,
//       haveRead: false,
//     };

//     return fetch(`http://localhost:8088/ownedBooks`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newOwnedBook),
//     })
//       .then((response) => response.json())
//       .then(() => {
//         navigate("/books");
//       });
//   };

//   const addtoCurrentlyReading = (event) => {
//     event.preventDefault();
//     const newOwnedBook = {
//       bookId: book.id,
//       userId: bookaholicUserObj.id,
//       haveRead: false,
//     };

//     return fetch(`http://localhost:8088/CurrentlyReadingBook`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newOwnedBook),
//     })
//       .then((response) => response.json())
//       .then(() => {
//         navigate("/");
//       });
//   };
//   /*
//   1. remove book button function. Fetch the owned books from API

//   2. then turn that response into java script(this will return a promise)

//   3. then take the data that is returned from step 2 and create a new variable called foundOwnedBook

//   4. map over the the data from step 3 and use the find method.

//   5. for each item in data set up logic that compares the userId to the currently logged in user and (&&) the bookId of the item to useparams bookId. the useParmas will be a string and must be parseInt.

//   6. i need to fetch the specif book that the user is looking at and use the DELETE method to reomve the foundOwnedBook from step 3

//   7. create an alert to notify the user that the change has been made and then navigate them to the home screen (/)
// */
//   const removeBookButton = (event) => {
//     event.preventDefault();

//     fetch(`http://localhost:8088/ownedBooks`)
//       .then((response) => response.json())
//       .then((data) => {
//         const foundOwnedBook = data.find(
//           (item) =>
//             item.userId === bookaholicUserObj.id &&
//             item.bookId === parseInt(bookId)
//         );

//         return fetch(`http://localhost:8088/ownedBooks/${foundOwnedBook.id}`, {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(foundOwnedBook),
//         })
//           .then((response) => response.json())
//           .then(() => {
//             navigate("/");
//           });
//       });
//   };

//   /*
//     1. fetch owned books

//     2. when that returns capute it in variable

//     3. logic to map through and find the book that matchs the user id and the book id

//     4. create the owned book obj that will be sent to the API and set the have read to the opisite of the result of  step 3

//     5. fetch the specific book and use the put method to add the obj from step 4

//     6. add an alert to notify user that the update was made.
//      7 review 1st fetch http://localhost:8088/ownedBooks?bookId=${bookId}

//      check if the book is in currently reading if true then remove it from currently reading in the API and if false do nothing

//      .find

//   */
//   const toggleBookRead = (event) => {
//     event.preventDefault();
//     fetch(`http://localhost:8088/ownedBooks`)
//       .then((response) => response.json())
//       .then((data) => {
//         const foundBook = data.find(
//           (item) =>
//             item.userId === bookaholicUserObj.id &&
//             item.bookId === parseInt(bookId)
//         );
//         const ownedBook = {
//           bookId: foundBook.bookId,
//           userId: foundBook.userId,
//           haveRead: !foundBook.haveRead,
//           id: foundBook.id,
//         };
//         return fetch(`http://localhost:8088/ownedBooks/${ownedBook.id}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(ownedBook),
//         })
//           .then((response) => response.json())
//           .then((response) => {
//             const checkCurrentlyReading = currentlyReading.find(
//               (book) => book.bookId === response.bookId
//             );
//             if (checkCurrentlyReading) {
//               const bookToReomve = {
//                 bookId: checkCurrentlyReading.bookId,
//                 userId: bookaholicUserObj.id,
//               };
//               return fetch(
//                 `http://localhost:8088/CurrentlyReadingBook/${checkCurrentlyReading.id}`,
//                 {
//                   method: "DELETE",
//                   headers: {
//                     "Content-Type": "application/json",
//                   },
//                   body: JSON.stringify(bookToReomve),
//                 }
//               )
//                 .then(fetch(`http://localhost:8088/wantToRead`))
//                 .then((response) => {
//                   response.json();
//                 })
//                 .then((data) => {
//                   const checkWantToRead = data.find(
//                     (book) => book.bookId === response.bookId
//                   );
//                   if (checkWantToRead) {
//                     const bookToReomve = {
//                       bookId: checkCurrentlyReading.bookId,
//                       userId: bookaholicUserObj.id,
//                     };
//                     return (
//                       fetch(
//                         `http://localhost:8088/wantToRead/${checkWantToRead.id}`
//                       ),
//                       {
//                         method: "DELETE",
//                         headers: {
//                           "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify(bookToReomve),
//                       }
//                     );
//                   }
//                 });
//             }
//           });
//       });
//   };
//   return (
//     <div className="book">
//       {canAddBook ? (
//         <>
//           <button
//             onClick={(clickEvent) => addBookToOwnedBooksButton(clickEvent)}
//           >
//             Add to Owned Books
//           </button>
//         </>
//       ) : (
//         <>
//           <button onClick={(clickEvent) => removeBookButton(clickEvent)}>
//             Remove From Owned Books
//           </button>
//           <button onClick={(clickEvent) => toggleBookRead(clickEvent)}>
//             Toggle Read
//           </button>
//           <button onClick={(clickEvent) => addtoCurrentlyReading(clickEvent)}>
//             Currently Reading
//           </button>
//         </>
//       )}
//       <header className="book-header">{book.title}</header>
//       <div>Author: {book.author}</div>
//       <div>Summary: {book.bookSummary}</div>
//       <div>
//         Genre:{" "}
//         {foundGenres.map((g, idx) => {
//           return <div key={idx}>{g}</div>;
//         })}
//       </div>
//     </div>
//   );
// };

// /* line 44 g is foundGenres (singular) and idx is the index position of the singular item.
//  */
