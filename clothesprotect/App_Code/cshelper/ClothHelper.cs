using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;


public static class ClothHelper
{


    public static Result GetInfoByTypeOrName(string typeid, string name, string userId, string id)
    {
        var result = new Result<List<Cloth>>();
        var whereexp = "a.clothTypeId = b.id";

        if (!string.IsNullOrEmpty(userId))
        {
            whereexp = whereexp + " and a.userId=" + userId;
        }

        if (!string.IsNullOrEmpty(id))
        {
            whereexp = whereexp + " and a.id=" + id;
        }

        if (typeid != "")
        {
            whereexp = whereexp + " and clothTypeId=" + typeid;
        }
        if (!string.IsNullOrEmpty(name))
        {
            whereexp = whereexp + " and clothName=" + name;
        }

        //此处需优化，参数化处理
        var sqltextFomat = "select a.*, b.type from [clothes].[dbo].[cloth] as a, [clothes].[dbo].[clothType] as b where {0}";
        DbHelperV2 dbhelperv2 = new DbHelperV2();
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, whereexp));
        if (dt == null || dt.Rows.Count == 0)
        {
            //Error todo  
            result.Code = 403;
            result.Message = "查无此人！";
            result.IsTrue = false;
            result.Data = new List<Cloth>();
            return result;
        }
        var dts = dt.ToCloths();
        result.Code = 200;
        result.Message = "成功！";
        result.Data = dts;
        result.IsTrue = true;
        return result;
    }

    public static Result AddCloth(Cloth model)
    {
        var result = new Result();
        DbHelperV2 dbhelperv2 = new DbHelperV2();
        //此处需优化，参数化处理
        var sqltextFomat = "insert into [clothes].[dbo].[cloth] (userId,clothTypeId,clothName,price,brand,fabric,season,size,color,imgUrl,createTime,endTime) values ('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}') ";
        var sqlText = string.Format(sqltextFomat, model.userId, model.clothTypeId, model.clothName, model.price, model.brand, model.fabric, model.season, model.size, model.color, model.imgUrl, model.createTime, model.endTime);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
    }

    public static Result EditCloth(Cloth model, int id)
    {
        var result = new Result();
        DbHelperV2 dbhelperv2 = new DbHelperV2();
        //此处需优化，参数化处理
        var sqltextFomat = "update [clothes].[dbo].[cloth]  set  userId='{0}',clothTypeId='{1}',clothName='{2}',price='{3}',brand='{4}',fabric='{5}',season='{6}',size='{7}',color='{8}',imgUrl='{9}',createTime='{10}',endTime='{11}') where id={12}  ";
        var sqlText = string.Format(sqltextFomat, model.userId, model.clothTypeId, model.clothName, model.price, model.brand, model.fabric, model.season, model.size, model.color, model.imgUrl, model.createTime, model.endTime, id);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
    }


    public static Result DeleteClothById(int id)
    {
        var result = new Result();
        DbHelperV2 dbhelperv2 = new DbHelperV2();
        //此处需优化，参数化处理
        var sqltextFomat = "delete from [clothes].[dbo].[cloth] where id={0} ";
        var sqlText = string.Format(sqltextFomat, id);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
    }




}