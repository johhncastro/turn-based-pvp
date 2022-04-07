var BootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BootScene (){
        Phaser.Scene.call(this, {key:'BootScene'});
    },
    preload: function (){
        this.load.spritesheet('player','assets/RPG_assets.png', {frameWidth: 16,frameHeight: 16});
        this.load.image('dragonblue','assets/dragonblue.png');
        this.load.image('dragonorrange','assets/dragonorrange.png');
    },

    create: function (){
        this.scene.start('BattleScene');
    }

});

var BattleScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BattleScene (){
        Phaser.Scene.call(this, {key: 'BattleScene'})
    },
    create: function (){

        // changes background color to green
        this.cameras.main.setBackgroundColor('rgba(0,200,0,0.5)');
        //player character - warrior
        var warrior = new PlayerCharacter(this,250,50,'player',1,'Warrior',100,20);
        this.add.existing(warrior);
        //player character -mage
        var mage = new PlayerCharacter(this,250,100,'player',1,'Mage',80,8);
        this.add.existing(mage);
        //enemy- dragon blue
        var dragonblue = new Enemy(this, 50, 50, 'dragonblue', null, 'Dragon', 50, 3);
        this.add.existing(dragonblue);
        //enemy dragon orange
        var dragonOrange = new Enemy(this, 50, 100, 'dragonorrange', null,'Dragon2', 50, 3);
        this.add.existing(dragonOrange);

        // array with heroes
        this.heroes = [ warrior, mage ];
        // array with enemies
        this.enemies = [ dragonblue, dragonOrange ];
        // array with both parties, who will attack
        this.units = this.heroes.concat(this.enemies);
        //Run UI Scene at the same time
        this.scene.launch('UIScene');
    }

});
// this var itself is a Scene in the game that we are going to run at the same time as the BattleScene

var UIScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function UIScene(){
        Phaser.Scene.call(this,{key:'UIScene'})
    },
    // this create method for the ui will create all attack moves and such but most importantly this is how u can make background colors for the ui without actually importing pictures
    create: function (){
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);
        this.graphics.strokeRect(2, 150, 90, 100);
        this.graphics.fillRect(2, 150, 90, 100);
        this.graphics.strokeRect(95, 150, 90, 100);
        this.graphics.fillRect(95, 150, 90, 100);
        this.graphics.strokeRect(188, 150, 130, 100);
        this.graphics.fillRect(188, 150, 130, 100);
    }
})

var config = {
    type:Phaser.AUTO,
    parent: 'content',
    width: 320,
    height: 240,
    zoom: 2,
    pixelArt: true,
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y:0}
        }
    },
    scene: [BootScene,BattleScene,UIScene]
};

var game = new Phaser.Game(config);


// now im going to make a concept for the units aka the enemies and the heros .
// this is what the base class unit is going to look like
var Unit = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:
    // this is all the attributes that each obj may have
    function Unit(scene, x ,y,texture,frame,type,hp,damage){
        Phaser.GameObjects.Sprite.call(this,scene,x,y,texture,frame)
        this.type = type;
        this.maxHP = this.hp = hp;
        this.damage = damage; // this is the default dmg
    },
    // this method is so that the chatacter outputs dmg
    attack: function (target){
        target.takeDamage(this.damage);
    },
    takeDamage: function (damage){
        this.hp -= damage;
    }
});

var Enemy = new Phaser.Class({
    Extends: Unit,
    initialize:
        function Enemy(scene, x, y, texture, frame, type, hp, damage) {
            Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
        }
});
var PlayerCharacter = new Phaser.Class({
    Extends: Unit,
    initialize:
        function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
            Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
            // flip the image so I don't have to edit it manually on the page
            this.flipX = true;

            this.setScale(2);
        }
});




