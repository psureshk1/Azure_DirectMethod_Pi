'use strict';
var Client=require('azure-iothub').Client;

// connection to the availbale iot hub instance in the azure subscription else create one and add its conne=ction string
var connectionString='HostName=ImpexIotLearningFeb14.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=KU0ZuVRTP1KucorObWO+RyhAq6YMwtcYM9bNFwpogCo=';

// method that is to be bound in the pi to trigger a stop event
var methodName='EmergencyValveRelease';

// the Raspberry pi that has the device identity from theI OT HUB
var deviceId='Test_PI_With_Functions';

// establish onnection with the client sensor
var piDevice=Client.fromConnectionString(connectionString);

//create method instance
var methodParams={
  methodName:methodName,
  payload:{
    valveReleaseNote:'checkpressure and exit system',
    messageStatus:'IMMINET'
  }
  timeoutInSeconds:30
};

// bind method obejct to the device
piDevice.invokeDeviceMethod(deviceId,methodParams,function(err,result){
  if(err){
    console.err('Failed to invoke function method\''+methodName+'\':' + err.message);
  } else{
    console.log(methodName + 'on' + deviceId + ':' );
    consle.log(JSON.stringify(result,null,2));
  }
});
