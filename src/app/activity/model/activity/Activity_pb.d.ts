// package: 
// file: Activity.proto

import * as jspb from "google-protobuf";

export class Activity extends jspb.Message {
  hasMeta(): boolean;
  clearMeta(): void;
  getMeta(): Activity.Meta | undefined;
  setMeta(value?: Activity.Meta): void;

  hasUserdata(): boolean;
  clearUserdata(): void;
  getUserdata(): Activity.UserData | undefined;
  setUserdata(value?: Activity.UserData): void;

  hasSummary(): boolean;
  clearSummary(): void;
  getSummary(): Activity.Summary | undefined;
  setSummary(value?: Activity.Summary): void;

  hasValues(): boolean;
  clearValues(): void;
  getValues(): Activity.Values | undefined;
  setValues(value?: Activity.Values): void;

  clearEventsList(): void;
  getEventsList(): Array<Activity.FitEvent>;
  setEventsList(value: Array<Activity.FitEvent>): void;
  addEvents(value?: Activity.FitEvent, index?: number): Activity.FitEvent;

  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Activity.AsObject;
  static toObject(includeInstance: boolean, msg: Activity): Activity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Activity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Activity;
  static deserializeBinaryFromReader(message: Activity, reader: jspb.BinaryReader): Activity;
}

export namespace Activity {
  export type AsObject = {
    meta?: Activity.Meta.AsObject,
    userdata?: Activity.UserData.AsObject,
    summary?: Activity.Summary.AsObject,
    values?: Activity.Values.AsObject,
    eventsList: Array<Activity.FitEvent.AsObject>,
    id: string,
  }

  export class Meta extends jspb.Message {
    getCreatedts(): string;
    setCreatedts(value: string): void;

    getManufacturer(): Activity.FitManufacturer;
    setManufacturer(value: Activity.FitManufacturer): void;

    getProduct(): number;
    setProduct(value: number): void;

    getVersion(): number;
    setVersion(value: number): void;

    getSource(): string;
    setSource(value: string): void;

    getUploadts(): string;
    setUploadts(value: string): void;

    getSport(): Activity.Sport;
    setSport(value: Activity.Sport): void;

    getSubsport(): Activity.SubSport;
    setSubsport(value: Activity.SubSport): void;

    getLocation(): string;
    setLocation(value: string): void;

    hasWeather(): boolean;
    clearWeather(): void;
    getWeather(): Activity.Weather | undefined;
    setWeather(value?: Activity.Weather): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Meta.AsObject;
    static toObject(includeInstance: boolean, msg: Meta): Meta.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Meta, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Meta;
    static deserializeBinaryFromReader(message: Meta, reader: jspb.BinaryReader): Meta;
  }

  export namespace Meta {
    export type AsObject = {
      createdts: string,
      manufacturer: Activity.FitManufacturer,
      product: number,
      version: number,
      source: string,
      uploadts: string,
      sport: Activity.Sport,
      subsport: Activity.SubSport,
      location: string,
      weather?: Activity.Weather.AsObject,
    }
  }

  export class UserData extends jspb.Message {
    getFeeling(): number;
    setFeeling(value: number): void;

    getNotes(): string;
    setNotes(value: string): void;

    clearTagsList(): void;
    getTagsList(): Array<string>;
    setTagsList(value: Array<string>): void;
    addTags(value: string, index?: number): string;

    getUserweather(): string;
    setUserweather(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserData.AsObject;
    static toObject(includeInstance: boolean, msg: UserData): UserData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserData;
    static deserializeBinaryFromReader(message: UserData, reader: jspb.BinaryReader): UserData;
  }

  export namespace UserData {
    export type AsObject = {
      feeling: number,
      notes: string,
      tagsList: Array<string>,
      userweather: string,
    }
  }

  export class Weather extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Weather.AsObject;
    static toObject(includeInstance: boolean, msg: Weather): Weather.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Weather, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Weather;
    static deserializeBinaryFromReader(message: Weather, reader: jspb.BinaryReader): Weather;
  }

  export namespace Weather {
    export type AsObject = {
    }
  }

  export class Summary extends jspb.Message {
    getHasattributemapMap(): jspb.Map<string, boolean>;
    clearHasattributemapMap(): void;
    getStartts(): string;
    setStartts(value: string): void;

    getEndts(): string;
    setEndts(value: string): void;

    getTotalelapsed(): number;
    setTotalelapsed(value: number): void;

    getTotaltimer(): number;
    setTotaltimer(value: number): void;

    getTotalmoving(): number;
    setTotalmoving(value: number): void;

    getTotalstopped(): number;
    setTotalstopped(value: number): void;

    getTotalpaused(): number;
    setTotalpaused(value: number): void;

    getTotalascent(): number;
    setTotalascent(value: number): void;

    getTotaldescent(): number;
    setTotaldescent(value: number): void;

    getTotaldistance(): number;
    setTotaldistance(value: number): void;

    getTotalcalories(): number;
    setTotalcalories(value: number): void;

    getAvghr(): number;
    setAvghr(value: number): void;

    getMaxhr(): number;
    setMaxhr(value: number): void;

    getMinhr(): number;
    setMinhr(value: number): void;

    getAvgcadence(): number;
    setAvgcadence(value: number): void;

    getMaxcadence(): number;
    setMaxcadence(value: number): void;

    getMincadence(): number;
    setMincadence(value: number): void;

    getAvgtemp(): number;
    setAvgtemp(value: number): void;

    getMaxtemp(): number;
    setMaxtemp(value: number): void;

    getMintemp(): number;
    setMintemp(value: number): void;

    getAvgspeed(): number;
    setAvgspeed(value: number): void;

    getMaxspeed(): number;
    setMaxspeed(value: number): void;

    getMingradient(): number;
    setMingradient(value: number): void;

    getMaxgradient(): number;
    setMaxgradient(value: number): void;

    getAvggradient(): number;
    setAvggradient(value: number): void;

    getNlaps(): number;
    setNlaps(value: number): void;

    getHrvsMap(): jspb.Map<string, number>;
    clearHrvsMap(): void;
    getTotalasctime(): number;
    setTotalasctime(value: number): void;

    getTotaldesctime(): number;
    setTotaldesctime(value: number): void;

    getTotalascdist(): number;
    setTotalascdist(value: number): void;

    getTotaldescdist(): number;
    setTotaldescdist(value: number): void;

    getPausedistance(): number;
    setPausedistance(value: number): void;

    getStopcount(): number;
    setStopcount(value: number): void;

    getPausecount(): number;
    setPausecount(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Summary.AsObject;
    static toObject(includeInstance: boolean, msg: Summary): Summary.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Summary, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Summary;
    static deserializeBinaryFromReader(message: Summary, reader: jspb.BinaryReader): Summary;
  }

  export namespace Summary {
    export type AsObject = {
      hasattributemapMap: Array<[string, boolean]>,
      startts: string,
      endts: string,
      totalelapsed: number,
      totaltimer: number,
      totalmoving: number,
      totalstopped: number,
      totalpaused: number,
      totalascent: number,
      totaldescent: number,
      totaldistance: number,
      totalcalories: number,
      avghr: number,
      maxhr: number,
      minhr: number,
      avgcadence: number,
      maxcadence: number,
      mincadence: number,
      avgtemp: number,
      maxtemp: number,
      mintemp: number,
      avgspeed: number,
      maxspeed: number,
      mingradient: number,
      maxgradient: number,
      avggradient: number,
      nlaps: number,
      hrvsMap: Array<[string, number]>,
      totalasctime: number,
      totaldesctime: number,
      totalascdist: number,
      totaldescdist: number,
      pausedistance: number,
      stopcount: number,
      pausecount: number,
    }
  }

  export class Values extends jspb.Message {
    clearTsList(): void;
    getTsList(): Array<string>;
    setTsList(value: Array<string>): void;
    addTs(value: string, index?: number): string;

    clearHrList(): void;
    getHrList(): Array<number>;
    setHrList(value: Array<number>): void;
    addHr(value: number, index?: number): number;

    clearLatList(): void;
    getLatList(): Array<number>;
    setLatList(value: Array<number>): void;
    addLat(value: number, index?: number): number;

    clearLonList(): void;
    getLonList(): Array<number>;
    setLonList(value: Array<number>): void;
    addLon(value: number, index?: number): number;

    clearSpeedList(): void;
    getSpeedList(): Array<number>;
    setSpeedList(value: Array<number>): void;
    addSpeed(value: number, index?: number): number;

    clearAltitudeList(): void;
    getAltitudeList(): Array<number>;
    setAltitudeList(value: Array<number>): void;
    addAltitude(value: number, index?: number): number;

    clearGradeList(): void;
    getGradeList(): Array<number>;
    setGradeList(value: Array<number>): void;
    addGrade(value: number, index?: number): number;

    clearDistanceList(): void;
    getDistanceList(): Array<number>;
    setDistanceList(value: Array<number>): void;
    addDistance(value: number, index?: number): number;

    clearTemperatureList(): void;
    getTemperatureList(): Array<number>;
    setTemperatureList(value: Array<number>): void;
    addTemperature(value: number, index?: number): number;

    clearMovingList(): void;
    getMovingList(): Array<boolean>;
    setMovingList(value: Array<boolean>): void;
    addMoving(value: boolean, index?: number): boolean;

    clearCadenceList(): void;
    getCadenceList(): Array<number>;
    setCadenceList(value: Array<number>): void;
    addCadence(value: number, index?: number): number;

    getHrvsMap(): jspb.Map<string, number>;
    clearHrvsMap(): void;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Values.AsObject;
    static toObject(includeInstance: boolean, msg: Values): Values.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Values, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Values;
    static deserializeBinaryFromReader(message: Values, reader: jspb.BinaryReader): Values;
  }

  export namespace Values {
    export type AsObject = {
      tsList: Array<string>,
      hrList: Array<number>,
      latList: Array<number>,
      lonList: Array<number>,
      speedList: Array<number>,
      altitudeList: Array<number>,
      gradeList: Array<number>,
      distanceList: Array<number>,
      temperatureList: Array<number>,
      movingList: Array<boolean>,
      cadenceList: Array<number>,
      hrvsMap: Array<[string, number]>,
    }
  }

  export class FitEvent extends jspb.Message {
    getStartidx(): number;
    setStartidx(value: number): void;

    getEndidx(): number;
    setEndidx(value: number): void;

    getTs(): string;
    setTs(value: string): void;

    getStartts(): string;
    setStartts(value: string): void;

    getEvent(): string;
    setEvent(value: string): void;

    getEventtype(): Activity.EventType;
    setEventtype(value: Activity.EventType): void;

    getTimertime(): number;
    setTimertime(value: number): void;

    getElapsedtime(): number;
    setElapsedtime(value: number): void;

    getMovingtime(): number;
    setMovingtime(value: number): void;

    getTrigger(): string;
    setTrigger(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FitEvent.AsObject;
    static toObject(includeInstance: boolean, msg: FitEvent): FitEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FitEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FitEvent;
    static deserializeBinaryFromReader(message: FitEvent, reader: jspb.BinaryReader): FitEvent;
  }

  export namespace FitEvent {
    export type AsObject = {
      startidx: number,
      endidx: number,
      ts: string,
      startts: string,
      event: string,
      eventtype: Activity.EventType,
      timertime: number,
      elapsedtime: number,
      movingtime: number,
      trigger: string,
    }
  }

  export enum FitManufacturer {
    UNKNOWN = 0,
    GARMIN = 1,
    GARMIN_FR405_ANTFS = 2,
    ZEPHYR = 3,
    DAYTON = 4,
    IDT = 5,
    SRM = 6,
    QUARQ = 7,
    IBIKE = 8,
    SARIS = 9,
    SPARK_HK = 10,
    TANITA = 11,
    ECHOWELL = 12,
    DYNASTREAM_OEM = 13,
    NAUTILUS = 14,
    DYNASTREAM = 15,
    TIMEX = 16,
    METRIGEAR = 17,
    XELIC = 18,
    BEURER = 19,
    CARDIOSPORT = 20,
    A_AND_D = 21,
    HMM = 22,
    SUUNTO = 23,
    THITA_ELEKTRONIK = 24,
    GPULSE = 25,
    CLEAN_MOBILE = 26,
    PEDAL_BRAIN = 27,
    PEAKSWARE = 28,
    SAXONAR = 29,
    LEMOND_FITNESS = 30,
    DEXCOM = 31,
    WAHOO_FITNESS = 32,
    OCTANE_FITNESS = 33,
    ARCHINOETICS = 34,
    THE_HURT_BOX = 35,
    CITIZEN_SYSTEMS = 36,
    MAGELLAN = 37,
    OSYNCE = 38,
    HOLUX = 39,
    CONCEPT2 = 40,
    ONE_GIANT_LEAP = 42,
    ACE_SENSOR = 43,
    BRIM_BROTHERS = 44,
    XPLOVA = 45,
    PERCEPTION_DIGITAL = 46,
    BF1SYSTEMS = 47,
    PIONEER = 48,
    SPANTEC = 49,
    METALOGICS = 50,
    I4IIIIS = 51,
    SEIKO_EPSON = 52,
    SEIKO_EPSON_OEM = 53,
    IFOR_POWELL = 54,
    MAXWELL_GUIDER = 55,
    STAR_TRAC = 56,
    BREAKAWAY = 57,
    ALATECH_TECHNOLOGY_LTD = 58,
    MIO_TECHNOLOGY_EUROPE = 59,
    ROTOR = 60,
    GEONAUTE = 61,
    ID_BIKE = 62,
    SPECIALIZED = 63,
    WTEK = 64,
    PHYSICAL_ENTERPRISES = 65,
    NORTH_POLE_ENGINEERING = 66,
    BKOOL = 67,
    CATEYE = 68,
    STAGES_CYCLING = 69,
    SIGMASPORT = 70,
    TOMTOM = 71,
    PERIPEDAL = 72,
    WATTBIKE = 73,
    MOXY = 76,
    CICLOSPORT = 77,
    POWERBAHN = 78,
    ACORN_PROJECTS_APS = 79,
    LIFEBEAM = 80,
    BONTRAGER = 81,
    WELLGO = 82,
    SCOSCHE = 83,
    MAGURA = 84,
    WOODWAY = 85,
    ELITE = 86,
    NIELSEN_KELLERMAN = 87,
    DK_CITY = 88,
    TACX = 89,
    DIRECTION_TECHNOLOGY = 90,
    MAGTONIC = 91,
    ONEPARTCARBON = 92,
    INSIDE_RIDE_TECHNOLOGIES = 93,
    SOUND_OF_MOTION = 94,
    STRYD = 95,
    ICG = 96,
    MIPULSE = 97,
    BSX_ATHLETICS = 98,
    LOOK = 99,
    CAMPAGNOLO_SRL = 100,
    BODY_BIKE_SMART = 101,
    PRAXISWORKS = 102,
    LIMITS_TECHNOLOGY = 103,
    TOPACTION_TECHNOLOGY = 104,
    COSINUSS = 105,
    FITCARE = 106,
    MAGENE = 107,
    GIANT_MANUFACTURING_CO = 108,
    TIGRASPORT = 109,
    DEVELOPMENT = 255,
    HEALTHANDLIFE = 257,
    LEZYNE = 258,
    SCRIBE_LABS = 259,
    ZWIFT = 260,
    WATTEAM = 261,
    RECON = 262,
    FAVERO_ELECTRONICS = 263,
    DYNOVELO = 264,
    STRAVA = 265,
    PRECOR = 266,
    BRYTON = 267,
    SRAM = 268,
    NAVMAN = 269,
    COBI = 270,
    SPIVI = 271,
    MIO_MAGELLAN = 272,
    EVESPORTS = 273,
    SENSITIVUS_GAUGE = 274,
    PODOON = 275,
  }

  export enum EventType {
    START = 0,
    STOP = 1,
    CONSECUTIVE_DEPRECIATED = 2,
    MARKER = 3,
    STOP_ALL = 4,
    BEGIN_DEPRECIATED = 5,
    END_DEPRECIATED = 6,
    END_ALL_DEPRECIATED = 7,
    STOP_DISABLE = 8,
    STOP_DISABLE_ALL = 9,
    NULL = 10,
  }

  export enum Sport {
    GENERIC = 0,
    RUNNING = 1,
    CYCLING = 2,
    TRANSITION = 3,
    FITNESS_EQUIPMENT = 4,
    SWIMMING = 5,
    BASKETBALL = 6,
    SOCCER = 7,
    TENNIS = 8,
    AMERICAN_FOOTBALL = 9,
    TRAINING = 10,
    WALKING = 11,
    CROSS_COUNTRY_SKIING = 12,
    ALPINE_SKIING = 13,
    SNOWBOARDING = 14,
    ROWING = 15,
    MOUNTAINEERING = 16,
    HIKING = 17,
    MULTISPORT = 18,
    PADDLING = 19,
    ALL = 254,
    INVALID = 255,
  }

  export enum SubSport {
    GENERIC_SUBSPORT = 0,
    TREADMILL = 1,
    STREET = 2,
    TRAIL = 3,
    TRACK = 4,
    SPIN = 5,
    INDOOR_CYCLING = 6,
    ROAD = 7,
    MOUNTAIN = 8,
    DOWNHILL = 9,
    RECUMBENT = 10,
    CYCLOCROSS = 11,
    HAND_CYCLING = 12,
    TRACK_CYCLING = 13,
    INDOOR_ROWING = 14,
    ELLIPTICAL = 15,
    STAIR_CLIMBING = 16,
    LAP_SWIMMING = 17,
    OPEN_WATER = 18,
    FLEXIBILITY_TRAINING = 19,
    STRENGTH_TRAINING = 20,
    WARM_UP = 21,
    MATCH = 22,
    EXERCISE = 23,
    CHALLENGE = 24,
    INDOOR_SKIING = 25,
    CARDIO_TRAINING = 26,
    INDOOR_WALKING = 27,
    CLASSIC = 28,
    SKATE = 29,
    ROLLER = 30,
    ALL_SUBSPORT = 254,
    INVALID_SUBSPORT = 255,
  }
}

