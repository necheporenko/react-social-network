export default function signTemplate(fullName, publicAddress) {
  return (
    `<?--- START HUMAN CARD ---?>

# HUMAN CARD

${publicAddress}

------------------------------------------------------------
This public address has been established for: 

## ${fullName}
------------------------------------------------------------

Self-signed on: Digital Signature: 

<?--- END HUMAN CARD ---?>`
  );
}
