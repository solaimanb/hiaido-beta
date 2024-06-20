import { IDBchats } from "@/types";

export interface Chat {
  query: string;
  response: string;
  loading: boolean;
  error?: string;
}

const dbName = "appDB";
const version = 1;

export async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onerror = (event) => {
      console.error(
        "Database error:",
        (event.target as IDBOpenDBRequest).error
      );
      reject((event.target as IDBOpenDBRequest).error);
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    // TODO: check this later when new version is released
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains("chats")) {
        db.createObjectStore("chats", { keyPath: "email" });
      }
    };
  });
}

export async function addChat(
  db: IDBDatabase,
  email: string,
  chat: Chat
): Promise<IDBValidKey> {
  if (!chat.response) return Promise.reject("Empty response"); // Do not store chats with empty responses

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("chats", "readwrite");
    const objectStore = transaction.objectStore("chats");

    // First, try to get the existing chats for the email
    const getRequest = objectStore.get(email);

    getRequest.onsuccess = () => {
      let data: IDBchats = getRequest.result;

      if (data) {
        // If data exists, append the new chat
        data.chats.push(chat);
      } else {
        // If no data exists, create a new array with the chat
        data = { email, chats: [chat] };
      }

      // Now, put the updated array back into the database
      const putRequest = objectStore.put(data);

      putRequest.onsuccess = () => {
        resolve(putRequest.result);
      };

      putRequest.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    };

    getRequest.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
}

export async function replaceChats(
  db: IDBDatabase,
  email: string,
  chats: Chat[]
): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["chats"], "readwrite");
    const objectStore = transaction.objectStore("chats");

    // First, try to get the existing chats for the email
    const getRequest = objectStore.get(email);

    getRequest.onsuccess = () => {
      const putRequest = objectStore.put({ email, chats });

      putRequest.onsuccess = () => {
        resolve();
      };

      putRequest.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    };

    getRequest.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
}

export async function getChats(
  db: IDBDatabase,
  email: string
): Promise<Chat[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("chats", "readonly");
    const objectStore = transaction.objectStore("chats");
    const request = objectStore.get(email);

    request.onsuccess = () => {
      const data: IDBchats = request.result;
      if (data) {
        resolve(data.chats as Chat[]);
      } else {
        resolve([]); // Return an empty array if no chats are found
      }
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
}

// async function updateChat(
//   db: IDBDatabase,
//   email: string,
//   chat: Chat,
//   key: IDBValidKey
// ): Promise<IDBValidKey> {
//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction([email], "readwrite");
//     const objectStore = transaction.objectStore(email);
//     const request = objectStore.put(chat, key);

//     request.onsuccess = () => {
//       resolve(request.result);
//     };

//     request.onerror = (event) => {
//       reject((event.target as IDBRequest).error);
//     };
//   });
// }

// async function deleteChat(
//   db: IDBDatabase,
//   email: string,
//   key: IDBValidKey
// ): Promise<void> {
//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction([email], "readwrite");
//     const objectStore = transaction.objectStore(email);
//     const request = objectStore.delete(key);

//     request.onsuccess = () => {
//       resolve();
//     };

//     request.onerror = (event) => {
//       reject((event.target as IDBRequest).error);
//     };
//   });
// }

// Usage example

// (async () => {
//   const db = await openDB({
//     "user1@example.com": { keyPath: "id", autoIncrement: true },
//     "user2@example.com": { keyPath: "id", autoIncrement: true },
//   });

//   const chat: Chat = {
//     query: "Hello",
//     response: "Hi there!",
//     loading: false,
//   };

//   // Add chat
//   const id = await addChat(db, "user1@example.com", chat);
//   console.log("Added chat with ID:", id);

//   // Get chats
//   const chats = await getChats(db, "user1@example.com");
//   console.log("Retrieved chats:", chats);
// })();
