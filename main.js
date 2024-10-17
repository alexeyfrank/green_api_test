class GreenApi {
  constructor(baseUrl, credentials) {
    this.baseUrl = baseUrl;
    this.credentials = credentials;
  }

  async getSettings() {
    try {
      const response = await fetch(
        `${this.baseUrl}/waInstance${this.credentials.idInstance}/getSettings/${this.credentials.apiTokenInstance}`
      ).then((response) => response.json());
      return response;
    } catch (error) {
      return error;
    }
  }

  async getStateInstance() {
    try {
      const response = await fetch(
        `${this.baseUrl}/waInstance${this.credentials.idInstance}/getStateInstance/${this.credentials.apiTokenInstance}`
      ).then((response) => response.json());
      return response;
    } catch (error) {
      return error;
    }
  }

  async sendMessage(chatId, message) {
    try {
      const response = await fetch(
        `${this.baseUrl}/waInstance${this.credentials.idInstance}/sendMessage/${this.credentials.apiTokenInstance}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ chatId, message })
        })
        .then((response) => response.json());
      return response;
    } catch (error) {
      return error;
    }
  }

  async sendFileByUrl(chatId, urlFile, fileName) {
    try {
      const response = await fetch(
        `${this.baseUrl}/waInstance${this.credentials.idInstance}/sendFileByUrl/${this.credentials.apiTokenInstance}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ chatId, urlFile, fileName })
        })
        .then((response) => response.json());
      return response;
    } catch (error) {
      return error;
    }
  }
}

function displayResponse(response) {
  console.log(response);
  if (response instanceof Error) {
    document.getElementById('response').value = 'Error: ' + response.message;
  } else {
    document.getElementById('response').value = JSON.stringify(response, null, 2);
  }
}

function setup() {
  const baseUrl = 'https://api.green-api.com';
  const credentials = {
    idInstance: '',
    apiTokenInstance: ''
  };

  document.querySelector('#idInstance').addEventListener('input', (e) => {
    credentials.idInstance = e.target.value;
  });

  document.querySelector('#apiTokenInstance').addEventListener('input', (e) => {
    credentials.apiTokenInstance = e.target.value;
  });

  document.querySelector('#getSettingsBtn').addEventListener('click', () => {
    new GreenApi(baseUrl, credentials).getSettings().then(displayResponse);
  });

  document.querySelector('#getStateInstanceBtn').addEventListener('click', () => {
    new GreenApi(baseUrl, credentials).getStateInstance().then(displayResponse);
  });

  document.querySelector('#sendMessageBtn').addEventListener('click', () => {
    const chatId = document.querySelector('#sendMessageChatId').value;
    const message = document.querySelector('#message').value;

    new GreenApi(baseUrl, credentials).sendMessage(chatId, message).then(displayResponse);
  });

  document.querySelector('#sendFileByUrlBtn').addEventListener('click', () => {
    const chatId = document.querySelector('#sendFileByUrlChatId').value;
    const urlFile = document.querySelector('#fileUrl').value;
    const fileName = urlFile.split('/').pop();

    new GreenApi(baseUrl, credentials).sendFileByUrl(chatId, urlFile, fileName).then(displayResponse);
  });
}

document.addEventListener('DOMContentLoaded', setup);