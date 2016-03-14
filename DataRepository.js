'use strict';

var React = require('react-native');

var {
  AsyncStorage,//�첽�洢
} = React;
var API_BRANDK_URL = "http://mrobot.pcauto.com.cn/v2/price/brands";//cover
var API_SERIALS_URL="http://mrobot.pcauto.com.cn/xsp/s/auto/buy/v1.3/getSerialListByBrandId.xsp?type=1&brandId=";
var API_PROMOTION_URL="http://mrobot.pcauto.com.cn/xsp/s/auto/buy/v1.5/promotionList.xsp?pageSize=5&pageNo=1&areaId=1";//�Ż���Ϣ�б�
function parseDateFromYYYYMMdd(str) {
  if (!str) return new Date();
  return new Date(str.slice(0, 4),str.slice(4, 6) - 1,str.slice(6, 8));
}

Date.prototype.yyyymmdd = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  var dd  = this.getDate().toString();
  return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
};

function DataRepository() { // Singleton pattern ��������
  if (typeof DataRepository.instance === 'object') {
    return DataRepository.instance;
  }
 DataRepository.instance = this;
}

DataRepository.prototype._safeStorage = function(key: string) {//��
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key, (error, result) => {//AsyncStorage�첽�洢
      var retData = JSON.parse(result);
      if (error) {
        console.error(error);
        resolve(null);//��������Ϊ��resolve
      } else {
        resolve(retData);
      }
    });
  });
};


/****��ȡƷ�����ݿ�ʼ***/
DataRepository.prototype.getBrands = function() {
  return this._safeStorage(API_BRANDK_URL);
}

DataRepository.prototype.updateBrands = function() {
  fetch(API_BRANDK_URL)
    .then((response) => response.json())
    .then((responseData) => {
      AsyncStorage.setItem(API_BRANDK_URL, JSON.stringify(responseData));
    })
    .catch((error) => {
      console.error(error);
    })
    .done();
}
/****��ȡƷ�����ݽ���***/


/****��ȡƷ�Ƶĳ�ϵ���ݿ�ʼ***/
DataRepository.prototype.getSerials = function(brandId) {
  return this._safeStorage(API_SERIALS_URL+brandId);
}

DataRepository.prototype.updateSerials = function(brandId) {
  fetch(API_SERIALS_URL+brandId)
      .then((response) => response.json())
      .then((responseData) => {
        AsyncStorage.setItem(API_SERIALS_URL+brandId, JSON.stringify(responseData.manufacturers));
      })
      .catch((error) => {
        console.error(error);
      })
      .done();
}
/****��ȡƷ�����ݽ���***/


/****��ȡ�Ż����ݿ�ʼ***/
DataRepository.prototype.getPromotions = function() {
  return this._safeStorage(API_PROMOTION_URL);
}

DataRepository.prototype.updatePromotions= function() {
  fetch(API_PROMOTION_URL)
      .then((response) => response.json())
      .then((responseData) => {
        AsyncStorage.setItem(API_PROMOTION_URL, JSON.stringify(responseData));
      })
      .catch((error) => {
        console.error(error);
      })
      .done();
}
/****��ȡ�Ż����ݽ���***/
module.exports = DataRepository;
