export default function signTemplate(fullName, publicAddress) {
  return (
    `<?--- (((((START DOCUMENT))))) ---?>
    <?--- (((((START HUMAN CARD))))) ---?>
# HUMAN CARD

------------------------------------------------------------

Public Address - ${publicAddress}

This public address has been established for: 

## ${fullName}

Self-signed on: Digital Signature:

------------------------------------------------------------

<?--- (((((END HUMAN CARD))))) ---?>
<?--- (((((END DOCUMENT))))) ---?>`
  );
}
