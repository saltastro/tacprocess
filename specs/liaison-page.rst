Liaison Astronomer Page
============================
Conceptual and Logical Solution
===============================
Purpose of the page
-------------------
The Liaison Astronomer page allows the SALT astronomer to select proposals that
they want to be liaison for. Once selections are submitted, SALT astronomers can
not modify the selection. Administrators of the page can select any SALT astronomer
to be the Liaison astronomer of any proposal and they can change liaison astronomer
but can not change it to none.

users
-----
 - SALT Astronomers
 - Page Administrators
 - Anyone else can not view this page

functionality
-------------
- Allow SALT astronomer to assign themselves as a liaison of a proposal
- Allow page admin to assign any SALT astronomer as a Liaison astronomer of any proposal.
- Allow page admin to update or change any proposal's liaison astronomer.

views
-----
The page will contain:

**Semester selector**

It will select between current semester
    
**Liaison astronomer selector**

It will select between the current user's proposals, all proposals or all proposals that
have not been assigned to a liaison astronomer yet.

**Search Proposal Code**

It will filter the proposals in the table to what has been entered on the search field
e.g:
- "2018" - only proposals with 2018 on their proposal code must be shown
- "2017 MLT" - only proposals with 2017 and MLT on their proposal code must be shown
- "2017MLT" - only proposals with 2017MLT on their proposal code must be shown which
is none on the current SDB so no proposal will be shown.

**Proposals Table**

This will contain columns proposal Code, Title, Summary, Proposal Investigator and Liaison
- proposal Code - will link to webmanager
- Title - proposal title
- Summary -  will download a proposal summary
- Proposal Investigator - Is proposal principal Investigator
- Liaison
    - SALT Astronomer - will have a check box for assigning a proposal to themselves
    - Admins - will have a Drop down selector to assign a proposal to SA.

**Tables preview below**

*table view for SA*

+---------------+----------+------------+-----------------------+-----------+
|proposal Code  |Title     | Summary    | Proposal Investigator | Liaison   |
+===============+==========+============+=======================+===========+
|code-1         |title-1   | download   | Investigator-1        | +-+       |
|               |          |            |                       | | |       |
|               |          |            |                       | +-+       |
+---------------+----------+------------+-----------------------+-----------+
|code-2         |title-1   | download   | Investigator-3        | liaison-1 |
+---------------+----------+------------+-----------------------+-----------+
|code-3         |title-1   | download   | Investigator-1        | +-+       |
|               |          |            |                       | | |       |
|               |          |            |                       | +-+       |
+---------------+----------+------------+-----------------------+-----------+
|code-4         |title-1   | download   | Investigator-7        | liaison-5 |
+---------------+----------+------------+-----------------------+-----------+
| ...           |...       | ...        | ...                   | ...       |
+---------------+----------+------------+-----------------------+-----------+
|code-10        |title-1   | download   | Investigator-5        | +-+       |
|               |          |            |                       | | |       |
|               |          |            |                       | +-+       |
+---------------+----------+------------+-----------------------+-----------+
|code-11        |title-1   | download   | Investigator-3        | liaison-1 |
+---------------+----------+------------+-----------------------+-----------+


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

    Submit all the current changes to Tac API.
    current changies only.

Physical solution
=================

All the data necessary to complete this page should be in the redux store.
From the store, the page only needs proposals, the current user and SALT astronomers.
Data should have or be like:

- user {Object} with keys
    - 'username' as a primary key/ id {str}
    - roles {array} of objects with keys
      - type {str}
      - partners {array} of str
    
- proposals {Object} with keys
    - proposalCode as primary key/ id {str}
    - liaisonAstronomer {str}
    - (other content to display on table e.g Title)..
    
- SALTAstronomer {Array} of objects with keys
    - name {str}
    - surname {str}
    - username {str}

**upon Submit**
    
Only changed proposals need to be submitted
Data will be submitted to the TAC API {/liaison} end-point
Data submitted to TAC API should be an array of Object with keys
- proposalCode {str}
- Liaison Astronomer Username {str}
Successes or failure massage will be displayed below the table, above the submit button
with submitting status either
- Success: Changes are successfully submitted
- Failure: Fail to submitted changes

**Actions**

*UPDATE_LIAISON_ASTRONOMER*
- params - proposal code and new liaison
- return - none

*SUBMIT_LIAISON_ASTRONOMERS*
- params - changed proposals with new liaisons username {array}
- return - submission status {boolean}
- *headers* - should contain a user token

*Tests*
- Are components rendering correctly
- If different users get different tables
- If different users get correct tables
- Data can be rendered correctly for different users
- proposals can be filtered correctly
