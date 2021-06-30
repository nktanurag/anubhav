// //get data
// db.collection('guides').get().then(snapshot=>{
//     setupGuide(snapshot.docs);
// });


//listen for auth status changes
auth.onAuthStateChanged(user=>{
    if(user)
    {
        //get data
        db.collection('guides').onSnapshot(snapshot=>{
            setupGuides(snapshot.docs);
            setupUI(user);
       },err=>{
        console.log(err.message);
       });
    }
    else
    {
        setupUI();
        setupGuides([]);
    }
});

//create new guide
const createForm=document.querySelector('#create-form');
createForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection('guides').add({
        title:createForm['title'].value,
        content:createForm['content'].value
    }).then(()=>{
        const modal=document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    })
})

//signup
const signupForm=document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const email=signupForm['signup-email'].value;
    const password=signupForm['signup-password'].value;
    

    //sign up the user
    //asynchonus task
    auth.createUserWithEmailAndPassword(email,password).then(cred=>{
        return db.collection('users').doc(cred.user.uid).set({
            degree: signupForm['signup-degree'].value,
            name: signupForm['signup-name'].value,
            
        });
    }).then(()=>{
        const modal=document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});


//signout
const logout=document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
       // console.log('user signed out');
    });
});

//login
const loginForm=document.querySelector('#login-form');
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    //get user info
    const email=loginForm['login-email'].value;
    const password=loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email,password).then(cred=>{

        const modal=document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
})