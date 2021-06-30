const guideList=document.querySelector('.guides');
const loggedOutLinks=document.querySelectorAll('.logged-out');
const loggedInLinks=document.querySelectorAll('.logged-in');
const accountDetails=document.querySelector('.account-details');

const setupUI=(user)=>{
 if(user){

    //acc info
    db.collection('users').doc(user.uid).get().then(doc=>{
        const html=`
        <div>Logged in as ${user.email}</div>
        <div><h5>Keep Shining ${doc.data().name}!</h5></div>
        <div>${doc.data().degree}</div>
        `;
        accountDetails.innerHTML=html;
    })
    

     //togglr ui elemets
     loggedInLinks.forEach(item=>item.style.display='block');
     loggedOutLinks.forEach(item=>item.style.display='none');
 }
 else{

    //hide acc info
    accountDetails.innerHTML='';
    loggedInLinks.forEach(item=>item.style.display='none');
    loggedOutLinks.forEach(item=>item.style.display='block');
 }
}

//setup guide
const setupGuides=(data) => {
    if(data.length)
    {
        let html='';
        data.forEach( doc => {
            const guide=doc.data();
            const li = `
            <li>
                <div class="collapsible-header grey lighten-4">${guide.title}</div>
                <div class="collapsible-body white">${guide.content}</div>
            </li>   
            `;
            html+=li;
        });
        
        guideList.innerHTML=html;
    }
    else{
        guideList.innerHTML='<h5 class="center-align">Login to view details!<br>🤐</h5>';
    }
}

//setup materialistic components
document.addEventListener('DOMContentLoaded',function(){  //waiting to load the content

    var modals= document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items=document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
});



