import {auth , db ,  storage , ref ,uploadBytes , collection , addDoc ,getDoc, updateDoc ,signOut ,getDocs ,deleteDoc,doc ,getDownloadURL } from '../firebase.js'

let formfield = document.querySelectorAll('.form input')
let Updateform = document.querySelector('.form')
const [title , name , image , category] = formfield
let submitbtn= document.getElementById('submit')
let updatebtn= document.getElementById('updatebtn')
let logoutbtn= document.getElementById('logout')
let discription = document.getElementById('discription')
let BlogCards = document.querySelector('.BlogCards')
let loader = document.querySelector('.loader')
loader.style.display='none'
let uid = null;
updatebtn.style.display='none'
const UploadToCloud= async ()=>{
  try{
    let imagePath = image.files[0]
    let imgName = imagePath.name
    const imgRef = ref(storage, `BlogsImg/${imgName}`);
    const snapshot =  await uploadBytes(imgRef, imagePath)
    
    Toastify({

      text: "Saving Your Data",
      
      duration: 3000
      
      }).showToast();


    const url = await getDownloadURL(imgRef);
    console.log(url); 
    return url;
  }
      catch(error){
        Toastify({

          text: "Error While Uploading Blog ",
          
          duration: 3000
          
          }).showToast();
      }

}


const uploadata=async()=>{
  Updateform.style.display='none'
  try {
      loader.style.display='block'
         const imgurl = await UploadToCloud();

        const docRef = await addDoc(collection(db, "BlogInfo"),
         {
          BlogImage:imgurl,
          Blogtitle :title.value,
          BloggerName : name.value,
          Category : category.value,
          Discription : discription.value
        });
        console.log("Document written with ID: ", docRef.id);
        Toastify({
 
            text: 'Blog Uploaded',
            
            duration: 3000
            
            }).showToast();
            viewblog()
      } catch (e) {
        Toastify({
 
            text: e,
            
            duration: 3000
            
            }).showToast();
        
      }
      title.value = ''
      name.value=''
      category.value=''
      discription.value=''
      image.value=''
        Updateform.style.display='block'
        loader.style.display='none'
}


submitbtn.addEventListener('click' , uploadata)


const Logut =()=>{
signOut(auth).then(() => {
    Toastify({
 
        text: "Sign Out Successfuly",
        
        duration: 3000
        
        }).showToast();

        window.location.href ='../login/login.html'
 
}).catch((error) => {
    Toastify({
 
        text: error.message,
        
        duration: 3000
        
        }).showToast();
});
}

logoutbtn.addEventListener('click' , Logut)


const viewblog=async()=>{
const querySnapshot = await getDocs(collection(db, "BlogInfo"));
BlogCards.innerHTML=''
querySnapshot.forEach((doc) => {
  const data = doc.data()
  console.log(data)
  BlogCards.innerHTML +=`  <div class="card" >
                <img  src="${data.BlogImage}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Title:${data.Blogtitle}</h5>
                  <h5 class="card-title">By:${data.BloggerName}</h5>
                  <h5 class="card-title">Category:${data.Category}</h5>
                  <p class="card-text">Discription:${data.Discription}</p>
                  <button style=" border: 1px solid black; border-radius: 10px; width: 150px; background-color: #0E64D2; color: #fff;outline: none;" onclick="editDoc('${doc.id}',this)">Edit Blog</button>
                  <button style=" border: 1px solid black; border-radius: 10px; width: 150px; background-color: #0E64D2; color: #fff;outline: none;  margin-top: 10px;" onclick="deleteData('${doc.id}')">Delete Blog</button>
             
                </div>
              </div>`
});
}

window.deleteData=async(id)=>{
   Updateform.style.display='none'
  console.log(id)
  BlogCards.innerHTML=''
  try{
     loader.style.display='block'
    await deleteDoc(doc(db, "BlogInfo", id));
    viewblog()
    Toastify({
 
      text: "Blog Deleted Successfully",
      
      duration: 3000
      
      }).showToast();
  }
  catch(error){
    Toastify({
 
      text: error,
      
      duration: 3000
      
      }).showToast();
  }
  Updateform.style.display='block'
        loader.style.display='none'
}
window.editDoc=async(id,btn)=>{
  updatebtn.style.display='block'
  try{
    const docRef = doc(db, "BlogInfo", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().Blogtitle);
      title.value = docSnap.data().Blogtitle
      name.value =docSnap.data().BloggerName
      category.value = docSnap.data().Category
      discription.value = docSnap.data().Discription
      uid =id
}
    } 
    
    catch(error){
      console.log(error)
    }
  }

const updateData = async()=>{
  try{
    await updateDoc(doc(db, "BlogInfo", uid),{
      Blogtitle :title.value,
      BloggerName : name.value,
      Category : category.value,
      Discription : discription.value
    });
    viewblog()
    Toastify({
 
      text: "Blog Updated Successfully",
      
      duration: 3000
      
      }).showToast();
  }
  catch(error){
    Toastify({
 
      text: error,
      
      duration: 3000
      
      }).showToast();
  }
  title.value = ''
  name.value=''
  category.value=''
  discription.value=''
  image.value=''
}  
updatebtn.addEventListener('click',updateData)
