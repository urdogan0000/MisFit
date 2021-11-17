exports.getIndexPage=(req,res)=> {
    res.status(200).render('index',{
        page_name:"index"
    });
};


exports.getLoginPage=(req,res)=> {
    res.status(200).render('login',{
        page_name:'login',
    })
}


exports.getRegisterPage=(req,res)=> {
    res.status(200).render('register',{
        page_name:'register',
    })
}