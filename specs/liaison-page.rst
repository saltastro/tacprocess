Liaison Astronomer Page (LA)
============================
Conceptual and Logical Solution
===============================
purpose of the page
-------------------
The Liaison Astronomer page allows the SA to select proposals that they want to be their liaison. Proposals that
already have SA's can not be selected. Once selections are submitted, LA's can not ***unselect*** themselves.
Administrators of the page can select any SA to be the LA of any proposal and they are the only users that can change LA's.

users
-----
 - SALT Astronomers
 - Page Administrators
 - Anyone else can not view this page

functionality
-------------
- Allow SA to assign themselves as a liaison of a proposal
- Allow page admin to assign any SA as a LA of any proposal.
- Allow page admin to update or change any proposal's LA.

views
-----
Page will contain:

Semester selector

    it will select between current semester
    
Liaison astronomer selector

    it will select between current user's proposals, all proposals or all proposals that
    does not have a LA yet
    
Proposals Table

    this will contain all the required **need to be confirmed**
    SA's will have a check box for assigning a proposal to themselves and Admins will
    have a Drop down selector to assign a proposal to SA.
    tables preview below

table view for SA
<select></select>

+--------+----------+------------+------+-----------+
|code    |Title     | Download   | ...  | Liaison   |
+========+==========+============+======+===========+
|code-1  |title-1   | download   | ...  | +-+       |
|        |          |            |      | | |       |
|        |          |            |      | +-+       |
+--------+----------+------------+------+-----------+
|code-2  |title-1   | download   | ...  | liaison-1 |
+--------+----------+------------+------+-----------+
|code-3  |title-1   | download   | ...  | +-+       |
|        |          |            |      | | |       |
|        |          |            |      | +-+       |
+--------+----------+------------+------+-----------+
|code-4  |title-1   | download   | ...  | liaison-5 |
+--------+----------+------------+------+-----------+
| ...    |...       | ...        | ...  | ...       |
+--------+----------+------------+------+-----------+
|code-10 |title-1   | download   | ...  | +-+       |
|        |          |            |      | | |       |
|        |          |            |      | +-+       |
+--------+----------+------------+------+-----------+
|code-11 |title-1   | download   | ...  | liaison-1 |
+--------+----------+------------+------+-----------+


table view for Admin


+--------+----------+------------+------+-----------+
|code    |Title     | Download   | ...  | Liaison   |
+========+==========+============+======+===========+
|code-1  |title-1   | download   | ...  | Selector  |
+--------+----------+------------+------+-----------+
|code-2  |title-1   | download   | ...  | Selector  |
+--------+----------+------------+------+-----------+
| ...    |...       | ...        | ...  | ...       |
+--------+----------+------------+------+-----------+

Submit/Save button:

    Save/submit all the current changes to Tac API.
    current changies only.
    
data
----
Physical solution
=================

this page will be developed using JavaScript, with the React.js framework and React Redux for data storage management.

All the data necessary to complete this page should be in the redux store.
From the store, the page only needs proposals, user and SALTAstronomers.
Data should have or be like:

- user {Json} with keys         
    - 'username' as a primary key/ id {str}
    - roles {array} of objects with keys
      - type {str}
      - partners {array} of str
    
- proposals {Json} with keys
    - proposalCode as primary key/ id {str}
    - liaisonAstronomer {str}
    - (other content to display on table e.g Title)..
    
- SALTAstronomer {Array} of objects with keys
    - name {str}
    - surname {str}
    - username {str}

return
- None

upon Save/Submit
    
    only changed proposals need to be submited
data parsed to TAC API should be an array of Json with keys
- proposalCode {str}
- Liaison Astronomer Username {str}
