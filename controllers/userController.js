import { throws } from "assert"

import userModel from "../model/userModel.js"

import bcrypt from 'bcrypt'

class Controller{

    static signup_get = (req,res)=>{


        console.log(req.session)

     //   req.session.isValid = true

     //   req.session.user_name = "Rock"

        console.log(req.session)

        console.log(req.session.id)

        res.render('signup.ejs')
    }


    static signup_post = async (req,res)=>{

        


        try{

            const form_data = req.body
       
            console.log(form_data)
 
         //   res.send(form_data)
 
              const existing_usr = await userModel.findOne({email:form_data.usr_email})
 
              if(existing_usr){
                req.session.msg =`Dear ${existing_usr} you are already registered.`
                 res.redirect('/login')
              }
              
              const hashed_pwd = await bcrypt.hash(form_data.usr_pwd,10)
 
              const user_to_save = new userModel({
                 
                 name : form_data.usr_name,
                 email : form_data.usr_email,
                 pwd : hashed_pwd
 
              })
 
              const usr_saved = await user_to_save.save()

              req.session.msg = `signup sccessfull dear ${usr_saved.name}`
 
            //  res.send(usr_saved)
 
            res.redirect('/login')
 



        }
        catch(err){
            console.log(err)
            res.send(err)
        }

    }

    static login_get = (req,res)=>{
        const myMsg = req.session.msg
        
        delete req.session.msg;

        res.render('login.ejs', {myMsg})
    }

    static login_post = async (req,res)=>{

        try{

            const form_data = req.body

            // first confirm that this is an existing user

            console.log(form_data)

            const existing_usr = await userModel.findOne({email:form_data.usr_email})

            console.log(existing_usr)
            if(!existing_usr){
                req.session.msg =`you are not registered.`
                console.log(existing_usr)
                console.log("Not an Existing User")

                res.redirect('/login')
      
            }

            else{
            
                const pwd_match = await bcrypt.compare(form_data.usr_pwd,existing_usr.pwd)

            console.log(pwd_match)

             if(pwd_match){

                // For Succesfully Logged in User We are 
                // Making isValid =true to give access to dashboard page
                // We have to comment out isValid = true in signup_get
                // to avoid isValid = true before Login process

                req.session.isValid = true

                // pass msg to dashbard using session
                // this msg is received in dashboard_get req.

                req.session.msg = `Welcome Dear ${existing_usr.name} to Dashboard !!!`

                res.redirect('/dashboard')
             }
             else{

                res.redirect('/login')
             }

            }


        }catch(err){

            console.log(err)
            res.send(err)
        }


    }

    static dashboard_get = (req,res)=>{
        // receiving msg var. from session

        const myMsg = req.session.msg

        res.render('dashboard.ejs',{myMsg})
    }
    static home_get = (req,res)=>{

        res.render('home.ejs')
    }

    static logout_post = (req,res)=>{

        req.session.destroy((err)=>{
            if (err) throw er

            res.redirect('/home')
        })
    }

}

export default Controller