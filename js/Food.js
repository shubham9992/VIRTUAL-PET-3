class Food{
    constructor(){
        var foodStock,lastFed;
        this.image=loadImage("images/Milk.png");
    }

    getFoodStock(){
        console.log("before "+Food);
        var getFoodStockRef=database.ref('Food');
        getFoodStockRef.on("value",function (data) {
            Food=data.val();
        });
        console.log("after "+Food);
    }

    updateFoodStock(foodUpdate){
        database.ref('/').update({
            Food:foodUpdate
        })
    }

    deductFood(){
        
    }
    
    display(){
        var x=80,y=100;
        
        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i=0;i<foodStock;i++){
                if(i%10===0){
                    x=80;
                    y+=50;
                }
                image(this.image,x,y,50,50);
                x+=30;
            }
        }
    }

    bedroom(){
        background(bedroom,550,500);
    }

    garden(){
        background(garden,550,500);
    }

    washroom(){
        background(washroom,550,500);
    }
}