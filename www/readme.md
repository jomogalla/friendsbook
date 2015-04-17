# friendsbook
A group based chat application, utilizing Facebook oAuth for authentication, AngularJS for the front-end and Firebase for the backend.

### Database Schema

##### Groups
    groups {
    	groupkey1:{
            title:title,
            description:description,
            private:private    //Might be removed and become the default
    	}
    	groupkey2:{...}
    }

##### People
Used to store my own user data as the Auth Document is not searchable/viewable. Groupkey values are used in the same way as in the members table.

    people {
    	uid1:{
    	    id: id1,
            displayName: name,
            ageRange: {
                min:21
            }
            gender: male,
            groups: {
                 groupkey1: true,
                 groupkey2: false
            },
            profilePhotoURL: URL
    	}
    	uid2:{...}
    }

##### Members
When someone gets invited to the list, they get added to the member list with a value of false. Meaning they have not accepted the invitation. When they accept the invitation, their value will be changed to true. If they reject the invitation, it will remove their key value from both the members list, and their personal group list.

    members {
    	groupkey1:{
            uid1:true,    // True means a user has accepted invitation
            uid2:true,
            uid3:false    // False means a user has not responded to an invitation
    	}
    	groupkey2:{...}
    }

##### Messages
    messages {
    	groupkey1:{
    		message1:{
    			uid:uid,
    			message:message
    		}
    		message2:{...}
    		message3:{...}
    	}
    	groupkey2:{...}
    }

### Database Rules & Security

    {
      "rules": {
        "groups":{
          "$group_id":{
            // READ: User must be logged in and a member of the group
            ".read": "auth !== null && root.child('members').child($group_id).child(auth.uid).exists()",
            
            // WRITE: User must be logged in and either a member of the group or it must be a new group
            ".write": "auth !== null  && (root.child('members').child($group_id).child(auth.uid).exists() || !data.exists())"
          }
        },
        "people":{
          "$user_id":{
            //READ: User must be logged in
            ".read": "auth !== null",
            
            //WRITE: User must be logged in & User must be owner
            ".write": "auth !== null && $user_id === auth.uid",
            
            "groups":{
              "$group_id":{
                 //WRITE: Other users can write if data doesnt exist and they belong to the group
                ".write": "!data.exists() && root.child('members').child($group_id).child(auth.uid).exists()"
              }
            }
          }
        },
        "members":{
          "$group_id":{
            // READ: User must be logged in and belong to group
            ".read": "auth !== null && data.child(auth.uid).exists()",
            
            // Allow write if the group does not exist
            ".write": "!data.exists()",
            
            "$user_id":{
              // WRITE: User must be logged in and user must belong to the group and the data must be new or they must be the owner
              ".write":"auth !== null && data.parent().child(auth.uid).exists() && (!data.exists() || $user_id === auth.uid)"
            }
          }
        },
        "messages":{
          "$group_id":{
            // READ: User must be logged in and belong to group
            ".read": "auth !== null && root.child('members').child($group_id).child(auth.uid).exists()",
            
            // WRITE: User must be logged in and belong to group
            ".write": "auth !== null && root.child('members').child($group_id).child(auth.uid).exists()",
            
            "$message_id":{
              // VALIDATE: A new message must have children UID and message
              ".validate": "newData.hasChildren(['uid', 'message'])",
              
              "uid":{
                // VALIDATE: the UID needs to match the currently authorized user
                ".validate": "newData.val() === auth.uid"
              },
              
              "message":{
                // VALIDATE: the message text needs to be a string and needs to be non-empty
                ".validate": "newData.isString() && newData.val().length > 0"
              },
              
              "$other":{
                // VALIDATE: no other fields can be included in a message
                ".validate": false
              }
            }
          }
        }
      }
    }
