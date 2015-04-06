# friendsbook

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
