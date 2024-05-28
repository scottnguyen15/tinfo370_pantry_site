# tinfo370_datapalate_web

4/28/2024

Scott:
- Made and uploaded the .html files for the login, home, and check-in pages. (I was grinding for the Nayak exam sorry y'all 😭)

5/1/2024

Scott:
- Added font integration for Encode Sans and Open Sans using Google Fonts' embed feature.
- Added a hover color for the buttons on the index (home) page.
- Fixed an error where clicking 'Asian' in the check-in form would send the page up. This error came from a mislabeling of the 'id=asian', where I had accidentally left it as 'id=yes'.
- Added the folders for css, js, and imgs to the GitHub repo.
- Updated the footer date from 4/25/2024 to 5/1/2024.

5/6/2024

Scott:
- Coded a method for the check-in page that hides the survey sections until the user has chosen 'yes' or 'no'. This was accomplished through making div sections for returning users and new users, then handling the visibility in the css.
- Created the pages for check-out and order-in. Every form has now been imported to the website interface!

5/7/2024

Gavin:
- Integrated Database into checkin.html forum (both yes and no)
- Made sure any null values aren't included in data
- Made sure every field must be filled in before submission
- Maintained integrity of Scott's deisgn

5/16/2024

Leo:
- Checked and reviewed all of the website code making sure there are no errors.
- Made slight adjustments to the design, making sure everything is spaced and sized nicely.
- Added/removed some spacing in between the Login/Bypass and the Submit/Back buttons.
- Added placeholder text inside every single text box to improve style.
- Italicized the top text in each form to not confuse anyone answering the form.

5/27/2024

Leo:
- Changed the check-in page to be the default page.
- Added a login button at the top right of the check-in page to access all the other pages.
- Improved the design of the check-in page by adding a logo at the top left and spaced everything properly.
- Fixed an issue in the check-in page that would display the Yes/No options before the buttons were pressed.
- Improved the visuals of the login page.
- Improved the visuals of the index page by ensuring all of the buttons were the same size.
- Updated the header for every page to have better organization and cleanliness.
- Fixed the error that had the footer and header have different a different width.
- Edited the footer.
- Created two different button types, one for the index page and one for everything else to make them look clean.
- Added a transition effect to the buttons to make them look nicer when hovering over them.

5/28/2024

Gavin:
- Implemented proper authentication system through Firebase
- Created auth-check.js to perform auth checks
- Users are now unable to enter form.html links into searchbar to bypass login (redirects)
- Swapped index.html and checkin.html code to ensure proper navigation flow
- Renamed checkin.html to home.html to avoid confusion
- Renamed and rerouted multiple js files for clarity
- Renamed checkout and checkin forms to keep our naming schemes consistent
- Cleaned up checkin form fields
- Forced users to enter uw.edu specific emails before submitting
- Forced users to enter numbers in studentid fields
- Added submission messages for checkout & orderin forms
- Forced users to only submit numbers on both forms
- Fixed issue where hitting the back button after a failed submission would display the message twice
- Removed database button due to security issues and out of scope/knowledge
- Removed bypass button due to Firebase auth making it obsolete
