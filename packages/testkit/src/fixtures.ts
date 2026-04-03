export const fixtureNfeXml = `<?xml version="1.0" encoding="UTF-8"?>
<nfeProc>
  <NFe>
    <infNFe>
      <ide>
        <cUF>35</cUF>
      </ide>
      <emit>
        <CNPJ>12345678000199</CNPJ>
      </emit>
      <dest>
        <CNPJ>98765432000100</CNPJ>
      </dest>
      <total>
        <vNF>1250.00</vNF>
      </total>
    </infNFe>
  </NFe>
</nfeProc>`;

export const fixtureOfx = `OFXHEADER:100
DATA:OFXSGML
<BANKMSGSRSV1>
  <STMTTRN>
    <TRNAMT>-250.00</TRNAMT>
    <NAME>Shell Posto</NAME>
  </STMTTRN>
</BANKMSGSRSV1>`;

export const fixtureBoletoText = `Linha digitavel 34191.79001 01043.510047 91020.150008 8 98760000012500`;
