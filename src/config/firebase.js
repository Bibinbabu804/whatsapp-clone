
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";







const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "chat-app-gs-79b61.firebaseapp.com",
    projectId: "chat-app-gs-79b61",
    storageBucket: "chat-app-gs-79b61.appspot.com",
    messagingSenderId: "887179695734",
    appId: "1:887179695734:web:198a47b73186c7f9c5f157"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


const signup = async (userName,email,password) => {
    try{

        const res =await createUserWithEmailAndPassword(auth,email,password);
            
          const user=res.user;
          await setDoc(doc(db,"users",user.uid),{

            id:user.uid,
            userName:userName.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There iam using whatsapp app",
            lastSeen:Date.now()


          })
          await setDoc(doc(db,"chats",user.uid),{

            chatsData:[]

          })

    }catch (error){
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
    

    }

}


  const login = async (email,password) =>{
    try{

     await signInWithEmailAndPassword(auth,email,password)

    } catch (error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
        

    }

  }

   const logout = async () => {

    try{
        await signOut(auth)

    } catch(error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))

    }
    
   }

   const resetPass =async (email) => {
    if (!email) {
      toast.error('Enter your email')

      return null
      
    }

    try {

      const userRef = collection(db,"users")
      const q =query(userRef,where("email","==",email))
      const querySnap = await getDocs(q)

      if (!querySnap.empty) {
        await sendPasswordResetEmail(auth,email)
        toast.success("Reset Email Sent")
        
      }else{
        toast.error("Email not found")
      }

      
    } catch (error) {

      console.error(error);
      toast.error(error.message)
      
      
    }



   }




export {signup,login,logout,auth,db,resetPass}
