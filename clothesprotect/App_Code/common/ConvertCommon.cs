using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

/// <summary>
/// ConvertCommon 的摘要说明
/// 接口返回数据结构，所有的接口
/// </summary>
public static class ConvertCommon
{
    public static List<User> ToUsers(this DataTable dt)
    {
        var result = new List<User>();
        if (dt == null || dt.Rows.Count == 0)
        {
            return result;
        }

        foreach (DataRow row in dt.Rows)
        {
            var model = new User();
            model.age = reurnSafeStr(row["age"]);
            model.userName = reurnSafeStr(row["userName"]);
            model.password = reurnSafeStr(row["password"]);
            model.alias = reurnSafeStr(row["alias"]);
            model.id = Convert.ToInt32(row["id"]);
            result.Add(model);
        }
        return result;

    }

    public static List<Figure> ToFigures(this DataTable dt)
    {
        var result = new List<Figure>();
        if (dt == null || dt.Rows.Count == 0)
        {
            return result;
        }

        foreach (DataRow row in dt.Rows)
        {
            var model = new Figure();
            model.userId = reurnSafeStr(row["userId"]);
            model.weight = reurnSafeStr(row["weight"]);
            model.stature = reurnSafeStr(row["stature"]);
            model.chestSize = reurnSafeStr(row["chestSize"]);
            model.waistSize = reurnSafeStr(row["waistSize"]);
            model.hiplineSize = reurnSafeStr(row["hiplineSize"]);
            model.id = Convert.ToInt32(row["id"]);
            result.Add(model);
        }
        return result;

    }

    public static List<Cloth> ToCloths(this DataTable dt)
    {
        var result = new List<Cloth>();
        if (dt == null || dt.Rows.Count == 0)
        {
            return result;
        }

        foreach (DataRow row in dt.Rows)
        {
            var model = new Cloth();
            model.userId = reurnSafeStr(row["userId"]);
            model.clothTypeId = reurnSafeStr(row["clothTypeId"]);
            model.clothName = reurnSafeStr(row["clothName"]);
            model.price = reurnSafeStr(row["price"]);
            model.brand = reurnSafeStr(row["brand"]);
            model.fabric = reurnSafeStr(row["fabric"]);
            model.season = reurnSafeStr(row["season"]);
            model.size = reurnSafeStr(row["size"]);
            model.color = reurnSafeStr(row["color"]);
            model.imgUrl = reurnSafeStr(row["imgUrl"]);
            model.createTime = reurnSafeStr(row["createTime"]);
            model.endTime = reurnSafeStr(row["endTime"]);
            model.type = reurnSafeStr(row["type"]);
            model.id = Convert.ToInt32(row["id"]);
            result.Add(model);
        }
        return result;

    }
    public static List<ClothType> ToClothTypes(this DataTable dt)
    {
        var result = new List<ClothType>();
        if (dt == null || dt.Rows.Count == 0)
        {
            return result;
        }

        foreach (DataRow row in dt.Rows)
        {
            var model = new ClothType();
            model.type = reurnSafeStr(row["type"]);
            model.id = Convert.ToInt32(row["id"]);
            result.Add(model);
        }
        return result;

    }

    public static List<Chuanda> ToChuanDa(this DataTable dt)
    {
        var result = new List<Chuanda>();
        if (dt == null || dt.Rows.Count == 0)
        {
            return result;
        }

        foreach (DataRow row in dt.Rows)
        {
            var model = new Chuanda();
            model.userId = reurnSafeStr(row["userId"]);
            model.styleId = reurnSafeStr(row["styleId"]);
            model.clothIds = reurnSafeStr(row["clothIds"]);
            model.describe = reurnSafeStr(row["describe"]);
            model.createTime = reurnSafeStr(row["createTime"]);
            model.endTime = reurnSafeStr(row["endTime"]);
            model.sName = reurnSafeStr(row["sName"]);
            model.name = reurnSafeStr(row["name"]);
            model.styledescribe = reurnSafeStr(row["styledescribe"]);
            model.id = Convert.ToInt32(row["id"]);
            result.Add(model);
        }
        return result;

    }

    public static List<Style> ToStyles(this DataTable dt)
    {
        var result = new List<Style>();
        if (dt == null || dt.Rows.Count == 0)
        {
            return result;
        }

        foreach (DataRow row in dt.Rows)
        {
            var model = new Style();
            model.sName = reurnSafeStr(row["sName"]);
            model.describe = reurnSafeStr(row["describe"]);
            model.id = Convert.ToInt32(row["id"]);
            result.Add(model);
        }
        return result;

    }

    private static string reurnSafeStr(object obj)
    {
        if (obj == null || obj == DBNull.Value)
        {
            return string.Empty;
        }
        return obj.ToString();
    }

    public static List<Link> ToLinks(this DataTable dt)
    {
        var result = new List<Link>();
        if (dt == null || dt.Rows.Count == 0)
        {
            return result;
        }

        foreach (DataRow row in dt.Rows)
        {
            var model = new Link();
            model.clothId = reurnSafeStr(row["clothId"]);
            model.userId = reurnSafeStr(row["userId"]);
            model.id = Convert.ToInt32(row["id"]);
            result.Add(model);
        }
        return result;

    }

    public static List<Collection> ToCollections(this DataTable dt)
    {
        var result = new List<Collection>();
        if (dt == null || dt.Rows.Count == 0)
        {
            return result;
        }

        foreach (DataRow row in dt.Rows)
        {
            var model = new Collection();
            model.clothId = reurnSafeStr(row["clothId"]);
            model.userId = reurnSafeStr(row["userId"]);
            model.clothName = reurnSafeStr(row["clothName"]);
            model.clothImgUrl = reurnSafeStr(row["imgUrl"]);
            model.startTime = reurnSafeStr(row["startTime"]);
            model.endTime = reurnSafeStr(row["endTime"]);
            model.id = Convert.ToInt32(row["id"]);
            result.Add(model);
        }
        return result;

    }

    public static List<Share> ToShares(this DataTable dt)
    {
        var result = new List<Share>();
        if (dt == null || dt.Rows.Count == 0)
        {
            return result;
        }

        foreach (DataRow row in dt.Rows)
        {
            var model = new Share();
            model.clothId = reurnSafeStr(row["clothId"]);
            model.clothName = reurnSafeStr(row["clothName"]);
            model.clothImgUrl = reurnSafeStr(row["imgUrl"]);
            model.date = reurnSafeStr(row["date"]);
            model.describe = reurnSafeStr(row["describe"]);
            model.id = Convert.ToInt32(row["id"]);
            result.Add(model);
        }
        return result;

    }
}