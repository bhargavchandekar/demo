let mongoose = require('mongoose');
let Users = mongoose.model("Users");
let User_Roles = mongoose.model("User_Roles");


//Add User and Update Roles
exports.AddUser = async function (req, res, next) {
    try {
        let firstName = req.body.FirstName;
        let middleName = req.body.MiddleName;
        let lastName = req.body.LastName;
        let userName = req.body.UserName;
        let role = req.body.Role || 'general';
        let possible = "0123456789";
        let data = "";
        for( let i= 0 ; i<4 ; i++) {
            data += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        //check is User exist or not with UserName
         let isUser = await Users.find({UserName:userName});
       //if User exists
        if(isUser.length > 0) {
            //not inserting duplicate entries in Roles Array.If user enters role then add otherwise by default general
            let userRole = await User_Roles.update({
                UserID: mongoose.Types.ObjectId(isUser[0]._id)},
                { "$addToSet": { "Roles": role } });
            if(userRole) {
                res.json("Role is Updated")
            }
        }
        //if User not exists
        else {
            let addUser = new Users({
                FirstName: firstName,
                MiddleName: middleName,
                LastName: lastName,
                UserName: firstName + lastName + data,
                CreatedOn: new Date(),
            });
            let userResult = await Users.create(addUser);
            if(userResult) {
                //new User then add admin Role so call to function
                let userRoleResult = await userRole(userResult._id);
                //if success from userRole function
                if(userRoleResult) {
                    res.json({
                        User:userResult,
                        User_Role:userRoleResult
                    })
                }
                else {
                    res.json("error in userRole")
                }
            }
            else {
                res.json("user are not added")
            }
        }
    }
    catch (exception) {
        res.json(exception.message);
    }
};

let userRole = async function (userId) {
    //check user exist or not
    let result = await Users.find({_id:mongoose.Types.ObjectId(userId)});
    //add admin role for user
    if(result.length > 0) {
        let userRoleResult = new User_Roles({
            UserID: result[0]._id,
            Roles: "admin",
            CreatedOn: new Date()
        });
        let userRoles = await User_Roles.create(userRoleResult);
        if(userRoles) {
            return({
                UserRole:userRoles
            })
        }
        else {
            return({
                message:'UserRole Not Saved'
            })
        }
    }
    else {
        return({
            message: "UserId is Incorrect"
        });
    }
};
