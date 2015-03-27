# Friendsbook

### Database Schema

##### Groups
    groups {
    	groupkey1:{
            title:title,
            description:description,
            private:private
    	}
    	groupkey2:{...}
    }

##### People
Used to store my own user data as the Auth Document is not searchable/viewable. Groupkey values are used in the same way as in the members table.

    people {
    	uid1:{
            username:username,
            groups:{
                 groupkey1: true,
                 groupkey2: false
            }
    	}
    	uid2:{...}
    }

##### Members
When someone gets invited to the list, they get added to the member list with a value of false. Meaning they have not accepted the invitation. When they accept the invitation, their value will be changed to true. If they reject the invitation, it will remove their key value from both the members list, and their personal group list.

    members {
    	groupkey1:{
            username1:true,    // True means a user has accepted invitation
            username2:true,
            username3:false    // False means a user has not responded to an invitation
    	}
    	groupkey2:{...}
    }

##### Messages
    messages {
    	groupkey1:{
    		message1:{
    			uid:uid,
    			username:username // DEPRECATED
    			message:message
    		}
    		message2:{...}
    		message3:{...}
    	}
    	groupkey2:{...}
    }