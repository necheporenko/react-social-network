/* DON'T TOUCH THIS STRING!!! */

export default function signTemplate(fullName, publicAddress) {
  return (
    `<?--- START HUMAN CARD ---?>

# Human Card
------------------------------------------------------------
**Public Address** - ${publicAddress}

This public address has been established for: 

## ${fullName}

Digital Signature: 

<?--- END HUMAN CARD ---?>`
  );
}

/* DON'T TOUCH THIS STRING!!! */
